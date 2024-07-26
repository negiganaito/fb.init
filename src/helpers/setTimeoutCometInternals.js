/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import JSScheduler from "./JSScheduler";

const callbackMap = new Map();
let idCounter = 0;

function clearInterval_DO_NOT_USE(intervalId) {
  if (intervalId !== null) {
    const callback = callbackMap.get(intervalId);
    if (callback !== undefined) {
      callbackMap.delete(intervalId);
      JSScheduler.cancelDelayedCallback_DO_NOT_USE(callback);
    }
  }
}

function clearTimeout_DO_NOT_USE(timeoutId) {
  if (timeoutId !== null) {
    const callback = callbackMap.get(timeoutId);
    if (callback !== undefined) {
      callbackMap.delete(timeoutId);
      JSScheduler.cancelDelayedCallback_DO_NOT_USE(callback);
    }
  }
}

// eslint-disable-next-line max-params
function setIntervalAtPriority_DO_NOT_USE(priority, callback, delay, ...args) {
  const intervalId = idCounter++;
  if (typeof callback !== "function") {
    return intervalId;
  }

  const repeatedCallback = () => {
    const scheduledCallback = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(
      priority,
      delay,
      repeatedCallback
    );
    callbackMap.set(intervalId, scheduledCallback);
    callback.apply(null, args);
  };

  const scheduledCallback = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(
    priority,
    delay,
    repeatedCallback
  );
  callbackMap.set(intervalId, scheduledCallback);
  return intervalId;
}

// eslint-disable-next-line max-params
function setTimeoutAtPriority_DO_NOT_USE(priority, callback, delay, ...args) {
  const timeoutId = idCounter++;
  if (typeof callback !== "function") {
    return timeoutId;
  }

  const scheduledCallback = JSScheduler.scheduleDelayedCallback_DO_NOT_USE(
    priority,
    delay,
    () => {
      callbackMap.delete(timeoutId);
      callback.apply(null, args);
    }
  );

  callbackMap.set(timeoutId, scheduledCallback);
  return timeoutId;
}

export {
  clearInterval_DO_NOT_USE,
  clearTimeout_DO_NOT_USE,
  setIntervalAtPriority_DO_NOT_USE,
  setTimeoutAtPriority_DO_NOT_USE,
};
