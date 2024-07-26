/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import areEqual from "./areEqual";

let defaultEqualityCheck;

const memoizeOneWithArgs = (
  fn,
  isEqual = defaultEqualityCheck || (defaultEqualityCheck = areEqual)
) => {
  let lastArgs;
  let lastResult;
  let calledOnce = false;

  return function (...args) {
    if (calledOnce && isEqual(args, lastArgs)) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn(args);
    calledOnce = true;

    return lastResult;
  };
};

export default memoizeOneWithArgs;
