/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

let isPassiveSupported = false;

try {
  const options = Object.defineProperty({}, "passive", {
    get() {
      isPassiveSupported = true;
    },
  });
  window.addEventListener("test", null, options);
} catch (err) {
  // No need to handle the error, passive event listeners are not supported
}

const makeEventOptions = (options) => {
  return isPassiveSupported
    ? options
    : typeof options === "boolean"
    ? options
    : options.capture || false;
};

export {
  isPassiveSupported as isPassiveEventListenerSupported,
  makeEventOptions,
};
