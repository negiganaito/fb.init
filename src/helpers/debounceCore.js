/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import TimeSlice from "./TimeSlice";

// eslint-disable-next-line max-params
function debounceCore(
  func,
  wait,
  context = null,
  setTimeoutFunc = setTimeout,
  clearTimeoutFunc = clearTimeout,
  immediate = false
) {
  let timeout;
  let callNow = true;

  function debounced(...args) {
    const later = TimeSlice.guard(() => {
      callNow = true;
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, "debounceCore");

    if (immediate) {
      if (callNow) {
        callNow = false;
        func.apply(context, args);
      } else {
        clearTimeoutFunc(timeout);
        timeout = setTimeoutFunc(later, wait);
      }
    } else {
      debounced.reset();
      later.__SMmeta = func.__SMmeta;
      timeout = setTimeoutFunc(later, wait);
    }
  }

  debounced.reset = function () {
    clearTimeoutFunc(timeout);
    timeout = null;
    callNow = true;
  };

  debounced.isPending = function () {
    return timeout !== null;
  };

  return debounced;
}

export default debounceCore;
