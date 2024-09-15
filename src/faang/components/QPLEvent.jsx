/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function getMarkerId(event) {
  return event.i;
}

function getSampleRate(event) {
  return event.r !== null ? event.r : 0;
}

function getSamplingMethod(event) {
  return event.m !== null ? event.m : 1;
}

export { getMarkerId, getSampleRate, getSamplingMethod };
