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

let performanceAbsoluteNow;

if (
  performance.now &&
  performance.timing &&
  performance.timing.navigationStart
) {
  const navigationStart = performance.timing.navigationStart;
  performanceAbsoluteNow = () => performance.now() + navigationStart;
} else {
  performanceAbsoluteNow = () => fallback();
}

performanceAbsoluteNow.setFallback = setFallback;

export default performanceAbsoluteNow;
