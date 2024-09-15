/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ErrorMetadata from "ErrorMetadata";
import performance from "fbjs/lib/performance";

import ErrorPubSub from "../../helpers/ErrorPubSub";

import QPLAddCometRequestHeaders from "./QPLAddCometRequestHeaders";
import { getMarkerId } from "./QPLEvent";
import QuickPerformanceLogger from "./QuickPerformanceLogger";

// eslint-disable-next-line no-restricted-globals
const globalObject = typeof window !== "undefined" ? window : self;

function appendDebugInfo(annotations, debugInfo) {
  if (debugInfo === null) {
    return annotations || null;
  }
  annotations = annotations || {};
  annotations.string = annotations.string || {};
  annotations.string.uf_debug_info = debugInfo;
  return annotations;
}

class QPLUserFlow {
  constructor() {
    QPLAddCometRequestHeaders();
    this._activeFlows = new Map();

    ErrorPubSub.unshiftListener((error) => {
      if (error.type !== "fatal") return;
      const activeFlowIds = this.getActiveFlowIDs();
      if (activeFlowIds.length === 0) return;

      const metadata = new ErrorMetadata();
      metadata.clearEntries();
      activeFlowIds.forEach((id) => {
        metadata.addEntry("QPL", "ACTIVE_FLOW_ID", id.toString());
      });

      const formattedMetadata = metadata.format();
      if (error.metadata) {
        error.metadata = [].concat(error.metadata, formattedMetadata);
      } else {
        error.metadata = formattedMetadata;
      }
    });
  }

  // eslint-disable-next-line max-params
  _setTimeout(flowId, instanceKey, timeout, onTimeout) {
    if (timeout === null) return;
    const timeoutId = globalObject.setTimeout(() => {
      if (onTimeout !== null) onTimeout(flowId, instanceKey);
      this.endTimeout(flowId, { instanceKey });
    }, timeout);

    if (!this._activeFlows.has(getMarkerId(flowId))) {
      this._activeFlows.set(getMarkerId(flowId), new Map());
    }

    const flowInstances = this._activeFlows.get(getMarkerId(flowId));
    flowInstances.set(instanceKey, timeoutId);
  }

  start(
    flowId,
    {
      instanceKey = 0,
      annotations,
      cancelExisting = false,
      cancelOnUnload = true,
      timestamp,
      trackedForLoss = true,
      joinOptions,
      timeoutInMs,
      onFlowTimeout,
      qplInternalDoNotUseAbsoluteTimeOrigin,
    } = {}
  ) {
    if (joinOptions !== null) {
      QuickPerformanceLogger.markerStartForJoin(flowId, joinOptions.joinId, {
        instanceKey,
        cancelExisting,
        cancelOnUnload,
        trackedForLoss,
        type: 2,
        qplInternalDoNotUseAbsoluteTimeOrigin,
        monotonicTimestamp: timestamp,
        absoluteTimeOriginMs: joinOptions.absoluteTimeOriginMs,
        sourceIsPrimary: joinOptions.sourceIsPrimary,
        closeSession: joinOptions.closeSession,
        unreliableSourceClockProcessId:
          joinOptions.unreliableSourceClockProcessId,
      });
    } else {
      QuickPerformanceLogger.markerStart(flowId, instanceKey, timestamp, {
        cancelExisting,
        cancelOnUnload,
        trackedForLoss,
        type: 2,
        qplInternalDoNotUseAbsoluteTimeOrigin,
      });
    }
    this._setTimeout(flowId, instanceKey, timeoutInMs, onFlowTimeout);
    if (annotations) {
      QuickPerformanceLogger.markerAnnotate(flowId, annotations, {
        instanceKey,
      });
    }
  }

  addAlignmentPointForJoin(
    flowId,
    pointId,
    { instanceKey, requestId, timestamp } = {}
  ) {
    QuickPerformanceLogger.addAlignmentPointForJoin(flowId, pointId, {
      instanceKey,
      requestId,
      timestamp,
    });
  }

  startFromNavStart(
    flowId,
    {
      instanceKey = 0,
      annotations,
      cancelExisting = false,
      cancelOnUnload = true,
      trackedForLoss = true,
      joinOptions,
      timeoutInMs,
      onFlowTimeout,
      qplInternalDoNotUseConvertToTimeOnServer,
    } = {}
  ) {
    if (joinOptions !== null) {
      QuickPerformanceLogger.markerStartForJoinFromNavStart(
        flowId,
        joinOptions.joinId,
        {
          instanceKey,
          cancelExisting,
          cancelOnUnload,
          trackedForLoss,
          type: 2,
          qplInternalDoNotUseConvertToTimeOnServer,
          absoluteTimeOriginMs: joinOptions.absoluteTimeOriginMs,
          sourceIsPrimary: joinOptions.sourceIsPrimary,
          closeSession: joinOptions.closeSession,
          unreliableSourceClockProcessId:
            joinOptions.unreliableSourceClockProcessId,
        }
      );
    } else {
      QuickPerformanceLogger.markerStartFromNavStart(flowId, instanceKey, {
        cancelExisting,
        cancelOnUnload,
        trackedForLoss,
        type: 2,
        qplInternalDoNotUseConvertToTimeOnServer,
      });
    }
    this._setTimeout(flowId, instanceKey, timeoutInMs, onFlowTimeout);
    if (annotations) {
      QuickPerformanceLogger.markerAnnotate(flowId, annotations, {
        instanceKey,
      });
    }
    if (joinOptions?.addAlignmentPoints === true) {
      const requestId = joinOptions?.requestId ?? "default_id";
      const requestStart = performance?.timing?.requestStart;
      if (requestStart !== null) {
        this.addAlignmentPointForJoin(flowId, 0, {
          instanceKey,
          requestId,
          timestamp: requestStart,
        });
      }
      const responseEnd = performance?.timing?.responseEnd;
      if (responseEnd !== null) {
        this.addAlignmentPointForJoin(flowId, 3, {
          instanceKey,
          requestId,
          timestamp: responseEnd,
        });
      }
    }
  }

  endSuccess(flowId, { instanceKey = 0, annotations, timestamp } = {}) {
    this._end(flowId, 2, instanceKey, annotations, timestamp);
  }

  endFailure(
    flowId,
    failureType,
    { instanceKey = 0, debugInfo, annotations, timestamp, error } = {}
  ) {
    this.markError(flowId, failureType, { debugInfo, instanceKey, error });
    this._end(flowId, 3, instanceKey, annotations, timestamp);
  }

  endValidationFailure_DO_NOT_USE(
    flowId,
    { instanceKey = 0, debugInfo, annotations, timestamp } = {}
  ) {
    this.markError(flowId, "validation_failed", { debugInfo, instanceKey });
    this._end(flowId, 7952, instanceKey, annotations, timestamp);
  }

  endTimeout(flowId, { instanceKey = 0, annotations, timestamp } = {}) {
    this._end(
      flowId,
      113,
      instanceKey,
      annotations,
      timestamp ?? QuickPerformanceLogger.currentTimestamp()
    );
  }

  endCancel(
    flowId,
    { instanceKey = 0, cancelReason = 4, annotations, timestamp } = {}
  ) {
    this._end(flowId, cancelReason, instanceKey, annotations, timestamp);
  }

  // eslint-disable-next-line max-params
  _end(flowId, endType, instanceKey, annotations, timestamp) {
    timestamp = timestamp ?? QuickPerformanceLogger.currentTimestamp();
    const flowInstances = this._activeFlows.get(getMarkerId(flowId));
    const timeoutId = flowInstances?.get(instanceKey);
    if (timeoutId !== null) {
      globalObject.clearTimeout(timeoutId);
      flowInstances.delete(instanceKey);
    }
    if (annotations) {
      QuickPerformanceLogger.markerAnnotate(flowId, annotations, {
        instanceKey,
      });
    }
    QuickPerformanceLogger.markerEnd(flowId, endType, instanceKey, timestamp);
  }

  addAnnotations(flowId, annotations, { instanceKey } = {}) {
    QuickPerformanceLogger.markerAnnotate(flowId, annotations, { instanceKey });
  }

  addPoint(flowId, pointId, { instanceKey, debugInfo, data, timestamp } = {}) {
    const annotations = appendDebugInfo(data, debugInfo);
    QuickPerformanceLogger.markerPoint(flowId, pointId, {
      data: annotations,
      instanceKey,
      timestamp,
    });
  }

  markError(flowId, errorType, { debugInfo, instanceKey, error } = {}) {
    QuickPerformanceLogger.markerAnnotate(
      flowId,
      {
        ...this._getErrorAnnotations(error),
        bool: { uf_has_error: true },
      },
      { instanceKey }
    );
    this.addPoint(flowId, errorType, { debugInfo, instanceKey });
  }

  storeBeforeNavigation(flowId, { instanceKey = 0 } = {}) {
    QuickPerformanceLogger.markerStoreBeforeNavigation(flowId, { instanceKey });
  }

  getActiveFlowIDs() {
    return QuickPerformanceLogger.getActiveMarkerIds({ type: 2 });
  }

  _getErrorAnnotations(error) {
    if (error === null) return {};
    const annotations = { int: {}, string: {} };
    annotations.string.uf_error_name = error.name;
    if (error.source?.code !== null) {
      annotations["int"].uf_graphql_error_code = error.source.code;
    }
    if (error.source?.exception?.class !== null) {
      annotations.string.uf_graphql_exception_class =
        error.source.exception.class;
    }
    return annotations;
  }
}

export default new QPLUserFlow();
