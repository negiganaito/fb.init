/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

function memoizeWithArgs(fn, keyFn, cache) {
  let memoizedCache;

  const memoizedFn = function (...args) {
    if (!memoizedCache) {
      memoizedCache = {};
    }

    const key = keyFn(...args);

    if (!hasOwnProperty.call(memoizedCache, key)) {
      memoizedCache[key] = fn(...args);
    }

    return memoizedCache[key];
  };

  return memoizedFn;
}

export default memoizeWithArgs;
