/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import MultiKeyMap from "./MultiKeyMap";

function memoizeWithArgsWeak(fn) {
  const cache = new MultiKeyMap();

  return function (...args) {
    const cachedResult = cache.get(args);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = fn(...args);
    cache.set(args, result);
    return result;
  };
}

export default memoizeWithArgsWeak;
