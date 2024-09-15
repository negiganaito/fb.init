/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const TOUCH_THRESHOLD = 5;
const OTHER_THRESHOLD = 1;

// eslint-disable-next-line max-params
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getPointerEventDistance(eventA, eventB) {
  return calculateDistance(
    eventA.clientX,
    eventA.clientY,
    eventB.clientX,
    eventB.clientY
  );
}

function isWithinThreshold(eventA, eventB) {
  const threshold =
    eventB.pointerType === "touch" || eventB.pointerType === "pen"
      ? TOUCH_THRESHOLD
      : OTHER_THRESHOLD;
  const distance = getPointerEventDistance(eventA, eventB);
  return distance <= threshold;
}

export { isWithinThreshold };
