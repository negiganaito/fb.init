/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import gkx from "gkx";

import OdsWebBatchFalcoEvent from "./OdsWebBatchFalcoEvent";
import Random from "./Random";
import * as Run from "./Run";
// Check if we are in a DOM environment or a worker
const canUseDOM =
  ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker;
let entitySamples = {};
let eventBuffer = null;
let flushTimeout = null;

// eslint-disable-next-line max-params
function bumpEntity(a, b, c, d = 1, e = 1) {
  if (entitySamples[b] !== null && entitySamples[b] <= 0) return;

  eventBuffer = eventBuffer || {};
  const categoryBuffer = eventBuffer[a] || (eventBuffer[a] = {});
  const keyBuffer = categoryBuffer[b] || (categoryBuffer[b] = {});
  const valueBuffer = keyBuffer[c] || (keyBuffer[c] = [0, null]);

  const scaledD = Number(d);
  const scaledE = Number(e);
  const sampleFactor = entitySamples[b] || 1;
  const adjustedD = scaledD / sampleFactor;
  const adjustedE = scaledE / sampleFactor;

  if (!isFinite(adjustedD) || !isFinite(adjustedE)) return;

  valueBuffer[0] += adjustedD;
  if (arguments.length >= 5) {
    valueBuffer[1] = (valueBuffer[1] || 0) + adjustedE;
  }

  scheduleFlush();
}

function scheduleFlush() {
  if (flushTimeout !== null) return;

  const delay = gkx("20935") ? 13000 / 2 : 5000;
  flushTimeout = setTimeout(() => {
    flushEvents();
  }, delay);
}

function setEntitySample(entity, sampleProbability) {
  if (!canUseDOM) return;
  entitySamples[entity] =
    Random.random() < sampleProbability ? sampleProbability : 0;
}

// eslint-disable-next-line max-params
function bumpEntityKey(entity, key, value, count = 1) {
  if (!canUseDOM) return;
  bumpEntity(entity, key, value, count);
}

// eslint-disable-next-line max-params
function bumpFraction(entity, key, value, count = 1, fraction = 1) {
  if (!canUseDOM) return;
  bumpEntity(entity, key, value, count, fraction);
}

function flushEvents(priority = "normal") {
  if (!canUseDOM) return;
  clearTimeout(flushTimeout);
  flushTimeout = null;

  if (eventBuffer === null) return;
  const eventsToFlush = eventBuffer;
  eventBuffer = null;

  const eventPayload = () => ({ batch: eventsToFlush });

  if (priority === "critical") {
    OdsWebBatchFalcoEvent.logCritical(eventPayload);
  } else {
    OdsWebBatchFalcoEvent.log(eventPayload);
  }
}

// Ensure events are flushed before the page unloads
Run.onUnload(() => {
  flushEvents("critical");
});

export { bumpEntityKey, bumpFraction, flushEvents as flush, setEntitySample };
