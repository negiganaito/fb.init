/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import debounceCore from "./debounceCore";

// eslint-disable-next-line max-params
function debounce(func, wait = 100, context, immediate, trailing) {
  const timeoutFunc = (fn, delay, args) =>
    setTimeout(fn, delay, args, !immediate);
  return debounceCore(func, wait, context, timeoutFunc, clearTimeout, trailing);
}

export default debounce;
