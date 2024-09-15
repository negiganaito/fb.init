/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useContext, useInsertionEffect, useRef } from "react";
import { getAppID } from "CurrentUser";
import { log as logEvent } from "MessengerWebUxEventFalcoEvent";
import { useMWThreadKeyMemoized } from "MWThreadKey.react";
import { useSinglePartialViewImpression } from "useSinglePartialViewImpression";

import { to_string } from "../../helpers/I64";
import { bumpEntityKey } from "../../helpers/ODS";

import { toNumber, unwrapIntEnum } from "./LSIntEnum";
import MessagingThreadType from "./MessagingThreadType";
import { WebUXEntryPointLoggingContext } from "./WebUXLoggingEntryPointContextProvider";
import { WebUXSurfaceLoggingContext } from "./WebUXLoggingSurfaceContextProvider";

const useInteractionLogger = () => {
  const log = createLogger();
  return useCallback(
    (event) => {
      const eventObject =
        typeof event === "string"
          ? { eventName: event, eventType: "interaction" }
          : { ...event, eventType: event.eventType || "interaction" };
      log(eventObject);
    },
    [log]
  );
};

const useLogOnPressInteraction = () => {
  const log = useInteractionLogger();
  return useCallback(
    (callback, event) => (data) => {
      callback?.(data);
      event && log(event);
    },
    [log]
  );
};

const useImpressionLogger = () => {
  const log = createLogger();
  return useCallback(
    (event) => {
      log({ ...event, eventType: "impression" });
    },
    [log]
  );
};

const useImpressionLoggerRef = (event, callback) => {
  const log = createLogger();
  useSinglePartialViewImpression({
    onImpressionStart: () => {
      log({ ...event, eventType: "impression" });
      callback?.();
    },
  });
};

const mapThreadType = (type) => {
  const number = toNumber(type);
  const entry = Object.entries(MessagingThreadType).find(
    ([key, value]) => value === number
  );
  return entry ? entry[0] : "unknown";
};

const createLogger = () => {
  const entryPointContext = useContext(WebUXEntryPointLoggingContext);
  const surfaceContext = useContext(WebUXSurfaceLoggingContext);
  const threadKey = useMWThreadKeyMemoized();

  const entryPointRef = useRef(entryPointContext);
  const surfaceRef = useRef(surfaceContext);
  const threadKeyRef = useRef(threadKey);

  useInsertionEffect(() => {
    entryPointRef.current = entryPointContext;
    surfaceRef.current = surfaceContext;
    threadKeyRef.current = threadKey;
  }, [entryPointContext, surfaceContext, threadKey]);

  return useCallback((event) => {
    const {
      ctaType,
      entryPoint,
      eventName,
      eventType,
      extraData,
      flowInstanceId,
      surface,
      threadKey,
      threadType,
    } = event;

    const currentThreadKey = threadKey ?? threadKeyRef.current;
    const currentEntryPoint = entryPoint ?? entryPointRef.current;
    const currentSurface = surface ?? surfaceRef.current;

    const eventThreadType = threadType ? mapThreadType(threadType) : "unknown";
    const logData = {
      cta_type: ctaType,
      entry_point: currentEntryPoint,
      event_type: eventType || "interaction",
      extra_data: extraData,
      flow_instance_id: flowInstanceId,
      surface: currentSurface,
      thread_fbid: currentThreadKey ? to_string(currentThreadKey) : undefined,
      thread_type: threadType ? unwrapIntEnum(threadType) : undefined,
    };

    logEvent(() => ({
      client_timestamp_ms: Date.now().toString(),
      event_name: eventName,
      ...logData,
    }));

    bumpEntityKey(
      getLoggingAppId(),
      `${eventName}_${eventThreadType}`,
      currentEntryPoint
    );
  }, []);
};

const getLoggingAppId = () => {
  const appId = getAppID();
  switch (appId) {
    case 1217981644879628:
    case 936619743392459:
    case 1035956773910536:
    case 487152425211411:
      return 938;
    case 2220391788200892:
      return 3185;
    case 772021112871879:
      return 3297;
    default:
      return 3185;
  }
};

export {
  useImpressionLogger,
  useImpressionLoggerRef,
  useInteractionLogger,
  useLogOnPressInteraction,
};
