/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const CometDebounce = (func, options = {}) => {
  const { leading, wait } = options;
  let isLeading = true;
  let timeoutId;

  const debouncedFunction = (...args) => {
    const callNow = leading && isLeading;

    const later = () => {
      isLeading = true;
      timeoutId = null;
    };

    if (callNow) {
      if (!isLeading) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
        return;
      }
      isLeading = false;
      func(...args);
    } else {
      debouncedFunction.reset();
      timeoutId = setTimeout(() => {
        timeoutId = null;
        func(...args);
      }, wait);
    }
  };

  debouncedFunction.isPending = () => timeoutId !== null;
  debouncedFunction.reset = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
    isLeading = true;
  };

  return debouncedFunction;
};

export default CometDebounce;
