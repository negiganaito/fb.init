/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ServerTimeData } from "./ServerTimeData";

let offsetMillis = 0;
let lastUpdateMillis = null;

// eslint-disable-next-line no-restricted-globals
const performanceTiming = (typeof window !== "undefined" ? window : self)
  .performance?.timing;

if (performanceTiming) {
  const { requestStart, domLoading } = performanceTiming;

  if (requestStart && domLoading) {
    const responseTime =
      ServerTimeData.timeOfResponseStart - ServerTimeData.timeOfRequestStart;
    const clientProcessingTime = domLoading - requestStart - responseTime;
    const networkDelay = clientProcessingTime / 2;
    const skew = domLoading - ServerTimeData.timeOfResponseStart - networkDelay;
    const marginOfError = Math.max(50, clientProcessingTime * 0.8);

    if (Math.abs(skew) > marginOfError) {
      offsetMillis = skew;
      lastUpdateMillis = Date.now();
    }
  }
} else {
  update(ServerTimeData.serverTime);
}

export function getMillis() {
  return Date.now() - offsetMillis;
}

export function getOffsetMillis() {
  return offsetMillis;
}

export function update(serverTime) {
  const currentSkew = Date.now() - serverTime;

  if (Math.abs(offsetMillis - currentSkew) > 60000) {
    offsetMillis = currentSkew;
    lastUpdateMillis = Date.now();
  }
}

export function getMillisSinceLastUpdate() {
  return lastUpdateMillis === null ? null : Date.now() - lastUpdateMillis;
}

export { getMillis as get, getOffsetMillis as getSkew };
