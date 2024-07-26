/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";

function createCancelableFunction(fn) {
  let originalFunction = fn;

  const cancelableFunction = (...args) => {
    return originalFunction(args);
  };

  cancelableFunction.cancel = () => {
    originalFunction = emptyFunction;
  };

  return cancelableFunction;
}

export default createCancelableFunction;
