/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import performanceNowSinceAppStart from "../../helpers/performanceNowSinceAppStart";

const reactCommitRegex = new RegExp(/^late_mutation\/(un)?expected_([0-9]+)$/);
const MAX_REACT_COMMIT_SIZE = 4;

// eslint-disable-next-line max-params
function annotateReactCommits(logger, markerId, reactCommits, instanceKey) {
  logger.QuickPerformanceLogger.markerAnnotate(
    markerId,
    { int: { numReactCommit: reactCommits.size } },
    { instanceKey }
  );
}

// eslint-disable-next-line max-params
function annotateStringArray(logger, markerId, key, value, instanceKey) {
  logger.QuickPerformanceLogger.markerAnnotate(
    markerId,
    { string_array: { [key]: value } },
    { instanceKey }
  );
}

// eslint-disable-next-line max-params
function addMarkerPoint(
  logger,
  markerId,
  pointName,
  data,
  instanceKey,
  timestamp
) {
  logger.QuickPerformanceLogger.markerPoint(markerId, pointName, {
    data: data !== null ? { string: { __key: data } } : null,
    instanceKey,
    timestamp,
  });
}

// eslint-disable-next-line max-params
function annotateTagsAndPoints(logger, markerId, trace, instanceKey) {
  logger.QuickPerformanceLogger.markerAnnotate(markerId, trace.annotations, {
    instanceKey,
  });
  // eslint-disable-next-line guard-for-in
  for (const tag in trace.tagSet) {
    const sortedTags = Array.from(trace.tagSet[tag]).sort();
    annotateStringArray(logger, markerId, tag, sortedTags, instanceKey);
  }
}

// eslint-disable-next-line max-params
function logMarkerPoints(config, logger, markerId, markerPoints, instanceKey) {
  // eslint-disable-next-line guard-for-in
  for (const pointName in markerPoints) {
    const point = markerPoints[pointName];
    const { data, timestamp, type } = point;
    if (
      !config.allowedQPLPointTypes.has(type) ||
      (config.qplPointFilterRegex && config.qplPointFilterRegex.exec(pointName))
    )
      continue;

    const pointData =
      reactCommitRegex.test(pointName) &&
      pointName !== "late_mutation/unexpected_1"
        ? filterData(point, ["reactStack"])
        : data;

    addMarkerPoint(
      logger,
      markerId,
      pointName,
      pointData && Object.keys(pointData).length
        ? JSON.stringify(pointData)
        : undefined,
      instanceKey,
      timestamp + config.appStart
    );
  }
}

function filterData(point, keysToRemove) {
  const data =
    point.data !== null ? JSON.parse(JSON.stringify(point.data)) : null;
  if (data !== null) {
    keysToRemove.forEach((key) => delete data[key]);
  }
  return data;
}

// eslint-disable-next-line max-params
function logSubspans(config, logger, markerId, subSpans, instanceKey) {
  // eslint-disable-next-line guard-for-in
  for (const spanName in subSpans) {
    const spanList = subSpans[spanName];
    if (config.qplPointFilterRegex && config.qplPointFilterRegex.exec(spanName))
      continue;

    for (let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      const { data, end, start, type } = span;
      if (!config.allowedQPLPointTypes.has(type)) continue;

      const spanPointName =
        spanList.length === 1
          ? spanName
          : `${spanName}_${i >= MAX_REACT_COMMIT_SIZE ? "MAX" : i + 1}`;
      addMarkerPoint(
        logger,
        markerId,
        `${spanPointName}_start`,
        undefined,
        instanceKey,
        start + config.appStart
      );
      addMarkerPoint(
        logger,
        markerId,
        `${spanPointName}_end`,
        Object.keys(data).length ? JSON.stringify(data) : undefined,
        instanceKey,
        end + config.appStart
      );
    }
  }
}

// eslint-disable-next-line max-params
function initQPL(config, logger, markerId, instanceKey, options) {
  const qplOptions = options?.qplMarkerType
    ? { type: options.qplMarkerType }
    : { ...null };
  logger.QuickPerformanceLogger.markerStart(
    markerId,
    instanceKey,
    config.appStart,
    qplOptions
  );
}

// eslint-disable-next-line max-params
function logQPL(config, logger, markerId, traceStatus, trace, instanceKey) {
  annotateReactCommits(logger, markerId, trace.commitSet, instanceKey);
  annotateTagsAndPoints(logger, markerId, trace, instanceKey);
  logMarkerPoints(config, logger, markerId, trace.markerPoints, instanceKey);
  logSubspans(config, logger, markerId, trace.subSpans, instanceKey);

  const action = config.qplActionMap[traceStatus];
  logger.QuickPerformanceLogger.markerEnd(
    markerId,
    action,
    instanceKey,
    performanceNowSinceAppStart() + config.appStart
  );
  return action;
}

function getTraceStatus(trace) {
  const intAnnotations = trace.annotations["int"];
  const stringAnnotations = trace.annotations.string;

  if (intAnnotations?.isError === 1) return "FAIL";
  if (trace.wasOffline) return "OFFLINE";
  if (stringAnnotations?.cancelType === "timeout") return "TIMEOUT";
  if (trace.wasCanceled || intAnnotations?.aborted === 1) return "CANCEL";
  return "SUCCESS";
}

export { getTraceStatus, initQPL, logQPL };
