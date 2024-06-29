/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Bootloader from "Bootloader";
import BootloaderEndpointConfig from "BootloaderEndpointConfig";
import clearImmediate from "clearImmediate";
import CSRFGuard from "CSRFGuard";
import fbError from "fb-error";
import FBLogger from "FBLogger";
import getAsyncParams from "getAsyncParams";
import getSameOriginTransport from "getSameOriginTransport";
import HasteResponse from "HasteResponse";
import performanceAbsoluteNow from "performanceAbsoluteNow";
import setImmediateAcrossTransitions from "setImmediateAcrossTransitions";
import TimeSlice from "TimeSlice";

const { ErrorXFBDebug } = fbError;
const { endpointURI } = BootloaderEndpointConfig;
let requestCounter = 0;
let immediateId = null;
let continuation = null;
let pendingBlockingModules = new Map();
let pendingNonBlockingModules = new Map();

const getModuleNames = (modules) => Array.from(modules.keys()).join(",");

const buildRequestURL = (blockingModules, nonBlockingModules) => {
  const params = {};

  if (blockingModules.size) {
    params.modules = getModuleNames(blockingModules);
  }

  if (nonBlockingModules.size) {
    params.nb_modules = getModuleNames(nonBlockingModules);
  }

  const queryString = Object.entries({
    ...params,
    ...getAsyncParams("GET"),
  })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return `${endpointURI}${endpointURI.includes("?") ? "&" : "?"}${queryString}`;
};

const sendRequest = (blockingModules, nonBlockingModules) => {
  if (blockingModules.size === 0 && nonBlockingModules.size === 0) return;

  const url = buildRequestURL(blockingModules, nonBlockingModules);
  const transport = getSameOriginTransport();
  const requestId = requestCounter++;
  const startTime = performanceAbsoluteNow();

  transport.open("GET", url, true);

  const continuation = TimeSlice.getGuardedContinuation(
    "Bootloader _requestHastePayload"
  );

  transport.onreadystatechange = () => {
    if (transport.readyState !== 4) return;

    continuation(() => {
      ErrorXFBDebug.addFromXHR(transport);

      const response =
        transport.status === 200
          ? JSON.parse(CSRFGuard.clean(transport.responseText))
          : null;

      if (response == null) {
        FBLogger("bootloader").warn(
          'Invalid bootloader response %s, blocking mods: %s; non-blocking mods: %s; "%s"',
          transport.status,
          getModuleNames(blockingModules),
          getModuleNames(nonBlockingModules),
          transport.responseText.substr(0, 256)
        );
        return;
      }

      if (response.error) {
        FBLogger("bootloader").warn(
          "Non-fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s",
          getModuleNames(blockingModules),
          getModuleNames(nonBlockingModules)
        );
      } else if (response.__error) {
        FBLogger("bootloader").warn(
          "Fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s",
          getModuleNames(blockingModules),
          getModuleNames(nonBlockingModules)
        );
        return;
      }

      TimeSlice.guard(
        () =>
          handleResponse(
            url,
            response,
            blockingModules,
            nonBlockingModules,
            requestId,
            startTime
          ),
        "Bootloader receiveEndpointData",
        { propagationType: TimeSlice.PropagationType.CONTINUATION }
      )();
    });
  };

  transport.send();
};

const handleResponse = (
  url,
  response,
  blockingModules,
  nonBlockingModules,
  requestId,
  startTime
) => {
  const responseTime = performanceAbsoluteNow();
  const { serverGenTime, hrp } = response;

  if (hrp == null) {
    const errorMsg =
      response.error +
      ", summary: " +
      response.errorSummary +
      ", description: " +
      response.errorDescription;
    FBLogger("be_null_hrp").mustfix(
      "Found null hrp, blocking mods: %s; non-blocking mods: %s; response error: %s",
      getModuleNames(blockingModules),
      getModuleNames(nonBlockingModules),
      errorMsg
    );
    return;
  }

  HasteResponse.handle(hrp, {
    source: "bootloader_endpoint",
    sourceDetail: JSON.stringify({
      b: Array.from(blockingModules.keys()),
      n: Array.from(nonBlockingModules.keys()),
    }),
    onBlocking: () => {
      [blockingModules, nonBlockingModules].forEach((modules) => {
        for (const mod of modules.values()) {
          Bootloader.done(mod);
        }
      });
    },
    onLog: (logData) => {
      [blockingModules, nonBlockingModules].forEach((modules) => {
        for (const mod of modules.keys()) {
          Bootloader.beDone(mod, requestId, {
            requestStart: startTime,
            responseStart: responseTime,
            serverGenTime,
            uri: url,
            ...logData,
          });
        }
      });
    },
  });
};

const flushPendingRequests = () => {
  const blockingModules = pendingBlockingModules;
  const nonBlockingModules = pendingNonBlockingModules;

  clearImmediate(immediateId);
  immediateId = null;
  continuation = null;
  pendingBlockingModules = new Map();
  pendingNonBlockingModules = new Map();

  sendRequest(blockingModules, nonBlockingModules);
};

const shouldFlushImmediately = () => {
  const maxBatchSize = BootloaderEndpointConfig.maxBatchSize;
  return maxBatchSize <= 0
    ? false
    : pendingBlockingModules.size + pendingNonBlockingModules.size >=
        maxBatchSize;
};

const BootloaderEndpoint = {
  load: (moduleName, isBlocking, callback) => {
    (isBlocking ? pendingBlockingModules : pendingNonBlockingModules).set(
      moduleName,
      callback
    );

    if (BootloaderEndpointConfig.debugNoBatching || shouldFlushImmediately()) {
      flushPendingRequests();
      return;
    }

    if (immediateId != null) return;

    continuation = TimeSlice.getGuardedContinuation(
      "Schedule async batch request: Bootloader._loadResources"
    );
    immediateId = setImmediateAcrossTransitions(() => {
      if (continuation) continuation(() => flushPendingRequests());
    });
  },
  forceFlush: () => {
    if (continuation) continuation(() => flushPendingRequests());
  },
};

export default BootloaderEndpoint;
