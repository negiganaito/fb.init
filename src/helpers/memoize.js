/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

const memoize = (fn) => {
  let cachedFn = fn;
  let result;

  return function () {
    if (arguments.length) {
      invariant(false, 4494);
    }
    if (cachedFn) {
      result = cachedFn();
      cachedFn = null;
    }
    return result;
  };
};

export default memoize;
