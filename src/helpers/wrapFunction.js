/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const wrappers = {};

function wrapFunction(fn, wrapperKey, description) {
  const wrappedFunction =
    wrapperKey in wrappers ? wrappers[wrapperKey](fn, description) : fn;
  return function (...args) {
    return wrappedFunction(args);
  };
}

wrapFunction.setWrapper = function (wrapperKey, wrapperFn) {
  wrappers[wrapperKey] = wrapperFn;
};

export default wrapFunction;
