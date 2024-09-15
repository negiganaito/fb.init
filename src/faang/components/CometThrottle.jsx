/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import unrecoverableViolation from "unrecoverableViolation";

function CometThrottle(func, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let timeout = null;
  let previous = 0;
  let context;
  let args;
  let result;

  const later = () => {
    const savedArgs = args;
    const savedContext = context;
    args = context = null;
    if (savedArgs === null) {
      throw unrecoverableViolation(
        "It should be impossible for cachedArgs to be null at the moment we invoke the throttled function. Investigate why this is the case.",
        "comet_infra"
      );
    } else {
      return func.apply(savedContext, savedArgs);
    }
  };

  const throttled = function () {
    const now = new Date().getTime();
    if (!previous && leading === false) previous = now;
    const remaining = wait - (now - previous);
    // eslint-disable-next-line no-invalid-this
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
    context = args = null;
  };

  return throttled;
}

export default CometThrottle;
