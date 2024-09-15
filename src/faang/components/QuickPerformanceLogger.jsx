/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import performanceNow from "fbjs/lib/performanceNow";
import PerfFalcoEvent from "PerfFalcoEvent";
import performanceNavigationStart from "performanceNavigationStart";
import { getCommonData } from "PerfXSharedFields";
import { Promise } from "Promise";
import QPLCore from "QPLCore";
import QPLInspector from "QPLInspector";
import USID from "USID";

import Arbiter from "../../helpers/Arbiter";
import Env from "../../helpers/Env";
import FBLogger from "../../helpers/FBLogger";
import gkx from "../../helpers/gkx";
import performanceAbsoluteNow from "../../helpers/performanceAbsoluteNow";
import { onBeforeUnload, onUnload } from "../../helpers/Run";
import WebStorage from "../../helpers/WebStorage";

import { getMarkerId } from "./QPLEvent";

// eslint-disable-next-line no-restricted-globals
const globalObject = typeof window !== "undefined" ? window : self;

function addMetadata(event) {
  const commonData = getCommonData();
  const metadata = {
    memory_stats: {
      total_mem:
        commonData.ram_gb !== null ? commonData.ram_gb * 1073741824 : null,
    },
    network_stats: {
      downlink_megabits: commonData.downlink_megabits,
      network_subtype: commonData.effective_connection_type,
      rtt_ms: commonData.rtt_ms,
    },
    sitedata_info: {
      client_push_phase: commonData.client_push_phase,
      client_revision: commonData.client_revision,
      server_revision: commonData.server_revision,
    },
    locale_info: {
      locale: commonData.locale,
      isRTL: commonData.isRTL,
    },
  };

  if (gkx("20836")) {
    metadata.workplace_info = { is_gemini: gkx("21050") };
  }
  if (
    gkx("21051") &&
    typeof globalObject.__sapienzMetadataCallback__ === "function"
  ) {
    const sapienzMetadata = globalObject.__sapienzMetadataCallback__();
    metadata.sapienz = {
      request_id: String(sapienzMetadata.requestId),
      config_name: String(sapienzMetadata.configName),
    };
  }
  if (gkx("21052")) {
    metadata.usid = { usid_override: USID.get().serializeForRequest() };
  }
  return { ...event, metadata: { ...event.metadata, ...metadata } };
}

function createMarkerKey(markerId, sampleRate, samplingMethod) {
  return { i: markerId, m: samplingMethod, r: sampleRate };
}

function sendEvent(event, debugInfo) {
  return new Promise((resolve) => {
    const eventToLog = debugInfo || event;
    if (typeof globalObject.__je2e_recordQPLMarker === "function") {
      globalObject.__je2e_recordQPLMarker(eventToLog);
    }
    if (Env.enable_qplinspector === true) {
      QPLInspector.appendLog(eventToLog);
    }
    if (gkx("21053") || gkx("20935") || gkx("21054")) {
      PerfFalcoEvent.logImmediately(() => eventToLog);
    } else if (gkx("2160") || gkx("21055") || gkx("1624")) {
      PerfFalcoEvent.logCritical(() => eventToLog);
    } else {
      PerfFalcoEvent.log(() => eventToLog);
    }
    resolve();
  });
}

function prepareEventForUpload(event) {
  return addMetadata({
    ...event,
    config_type: gkx("21056") ? "alpha_beta" : "prod",
  });
}

function shouldUnsampleAllEvents() {
  return (
    Env.enable_qplinspector === true ||
    typeof globalObject.__je2e_recordQPLMarker === "function" ||
    gkx("21057")
  );
}

function notifyQPLDebuggerFinished() {
  Arbiter.inform("qpl_debugger_finished");
}

const moduleLoadTimestamp = performanceAbsoluteNow();
if (typeof globalObject.__je2e_felabsTracePlugin_setQplInit === "function") {
  globalObject.__je2e_felabsTracePlugin_setQplInit(performanceNow());
}

const logger = {
  debug: (category, message, context) => {},
  warn: (message) =>
    FBLogger.FBLogger("qpl").blameToPreviousDirectory().warn(message),
};

const storageKey = "qpl";

class QuickPerformanceLogger extends QPLCore {
  constructor() {
    super({
      decorateEventBeforeUpload: prepareEventForUpload,
      unsampleAllEvents: shouldUnsampleAllEvents,
      onDebuggingIdEnded: notifyQPLDebuggerFinished,
      monotonicNowMs: performanceAbsoluteNow,
      unixNowMs: performanceAbsoluteNow,
      moduleLoadTimestamp,
      logger,
      sendEvent,
      runtimeAbstractionLayer: {
        setTimeout: globalObject.setTimeout,
        clearTimeout: globalObject.clearTimeout,
      },
      debugLoggingEnabled: Env.qpl_debug_logging,
    });

    const onUnloadHandler = gkx("21055")
      ? gkx("21058")
        ? (callback) => onBeforeUnload(callback, false)
        : onBeforeUnload
      : onUnload;
    onUnloadHandler(() => {
      this._saveMarkersBeforeUnload();
      this._endMarkersOnUnload(706, {
        respectUnloadPolicy: true,
        timestamp: this.currentTimestamp(),
      });
    });

    this._loadSavedMarkers();
    this.initQplFlipperPlugin();
    this.initQplSapienzPlugin();
  }

  _loadSavedMarkers() {
    const sessionStorage = WebStorage.getSessionStorageForRead();
    if (!sessionStorage) {
      this._logDebugMessage(
        "#loadSavedState",
        "sessionStorage is not available"
      );
      return;
    }

    const savedState = sessionStorage.getItem(storageKey);
    if (savedState === null) return;

    sessionStorage.removeItem(storageKey);

    let parsedState;
    try {
      parsedState = JSON.parse(savedState);
    } catch (error) {
      this._logDebugMessage(
        "#loadSavedState",
        "Saved state failed to deserialize"
      );
      return;
    }

    if (
      parsedState === null ||
      parsedState.markers === null ||
      parsedState.markers.length === 0
    ) {
      this._logDebugMessage("#loadSavedState", "No saved markers found");
      return;
    }

    parsedState.markers.forEach(([markerId, instanceKey, marker]) => {
      this.addMarker(markerId, instanceKey, marker);
      this._logDebugMessage(
        "#loadSavedState",
        `Marker ${markerId} (instanceKey: ${instanceKey}) resumed`
      );
    });
  }

  _saveMarkersBeforeUnload() {
    const markersToSave = [];

    this.activeMarkers.forEach((instances, markerId) => {
      instances.forEach((marker, instanceKey) => {
        if (marker.resumeAfterNavigation === true) {
          delete marker.resumeAfterNavigation;
          markersToSave.push([markerId, instanceKey, marker]);
        }
      });
    });

    if (markersToSave.length > 0) {
      const sessionStorage = WebStorage.getSessionStorage();
      const state = { markers: markersToSave };
      const error = WebStorage.setItemGuarded(
        sessionStorage,
        storageKey,
        JSON.stringify(state)
      );
      if (error) {
        markersToSave.forEach(([markerId, instanceKey, marker]) => {
          const markerKey = createMarkerKey(
            markerId,
            marker.sampleRate,
            marker.samplingMethod
          );
          this.markerEnd(markerKey, 96, instanceKey);
        });
        this._logDebugMessage(
          "#storeSavedState",
          `Failed to store saved state: ${error.message}`
        );
        FBLogger("qpl")
          .catching(error)
          .warn(`Failed to store QPL state: ${JSON.stringify(state, null, 2)}`);
      }

      markersToSave.forEach(([markerId, instanceKey]) => {
        this.deleteMarker(markerId, instanceKey);
      });
    }
  }

  markerStoreBeforeNavigation(markerId, { instanceKey = 0 } = {}) {
    const markerKey = getMarkerId(markerId);
    const marker = this.getMarker(markerId, instanceKey);
    if (!marker) {
      this._logDebugMessage(
        "markerStoreBeforeNavigation",
        `Failed to set marker to store on page unload. Could not find marker ${markerKey}, instanceKey=${instanceKey}`
      );
      return;
    }
    marker.resumeAfterNavigation = true;
    this._logDebugMessage(
      "markerStoreBeforeNavigation",
      `Set marker ${markerKey} to store on page unload, instanceKey=${instanceKey}`
    );
  }

  markerStartFromNavStart(markerId, instanceKey = 0, options = {}) {
    const {
      cancelExisting = false,
      cancelOnUnload = false,
      trackedForLoss = false,
      type = 1,
      qplInternalDoNotUseConvertToTimeOnServer,
    } = options;
    const navigationStartTime = performanceNavigationStart();
    const absoluteTimeOrigin =
      typeof qplInternalDoNotUseConvertToTimeOnServer === "function"
        ? qplInternalDoNotUseConvertToTimeOnServer(navigationStartTime)
        : undefined;
    this.markerStart(markerId, instanceKey, navigationStartTime, {
      cancelExisting,
      cancelOnUnload,
      trackedForLoss,
      type,
      qplInternalDoNotUseAbsoluteTimeOrigin: absoluteTimeOrigin,
    });

    if (performanceNavigationStart.isPolyfilled) {
      const marker = this.getMarker(markerId, instanceKey);
      if (marker) {
        marker.timestampIsApproximate = true;
      }
    }
  }

  markerStartForJoinFromNavStart(markerId, joinId, options = {}) {
    const {
      instanceKey = 0,
      cancelExisting = false,
      cancelOnUnload = false,
      trackedForLoss = false,
      type = 1,
      qplInternalDoNotUseConvertToTimeOnServer,
      absoluteTimeOriginMs,
      sourceIsPrimary = false,
      closeSession,
      unreliableSourceClockProcessId,
    } = options;

    const navigationStartTime = performanceNavigationStart();
    const absoluteTimeOrigin =
      typeof qplInternalDoNotUseConvertToTimeOnServer === "function"
        ? qplInternalDoNotUseConvertToTimeOnServer(navigationStartTime)
        : undefined;
    this.markerStartForJoin(markerId, joinId, {
      instanceKey,
      cancelExisting,
      cancelOnUnload,
      trackedForLoss,
      type,
      qplInternalDoNotUseAbsoluteTimeOrigin: absoluteTimeOrigin,
      monotonicTimestamp: navigationStartTime,
      absoluteTimeOriginMs,
      sourceIsPrimary,
      closeSession,
      unreliableSourceClockProcessId,
    });

    if (performanceNavigationStart.isPolyfilled) {
      const marker = this.getMarker(markerId, instanceKey);
      if (marker) {
        marker.timestampIsApproximate = true;
      }
    }
  }

  _endMarkersOnUnload(endType, options = {}) {
    const { timestamp, respectUnloadPolicy } = options;
    this.activeMarkers.forEach((instances, markerId) => {
      instances.forEach((marker, instanceKey) => {
        if (!respectUnloadPolicy || marker.cancelOnUnload === true) {
          const markerKey = createMarkerKey(
            markerId,
            marker.sampleRate,
            marker.samplingMethod
          );
          this.markerEnd(markerKey, endType, instanceKey, timestamp);
        }
      });
    });
  }

  _logDebugMessage(category, message, context) {
    logger.debug(category, message, context);
  }

  initQplFlipperPlugin() {
    // if (cr686 !== null) {
    //   this.addListener(cr686.qplFlipperPlugin.listener());
    // }
  }

  initQplSapienzPlugin() {
    // if (cr1984081 !== null) {
    //   this.addListener(cr1984081.getQplSapienzListener());
    // }
  }
}

export default new QuickPerformanceLogger();
