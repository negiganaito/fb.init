/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import performance from "fbjs/lib/performance";

let fallback = () => Date.now();

function setFallback(fallbackFunction) {
  fallback = fallbackFunction;
}

let performanceNow;

if (
  performance.now &&
  performance.timing &&
  performance.timing.navigationStart
) {
  const navigationStart = performance.timing.navigationStart;
  performanceNow = () => performance.now() + navigationStart;
} else {
  performanceNow = () => fallback();
}

performanceNow.setFallback = setFallback;

export default performanceNow;
