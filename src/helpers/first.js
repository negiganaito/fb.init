/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function first(iterable) {
  if (Array.isArray(iterable)) {
    return iterable.length > 0 ? iterable[0] : null;
  }

  const iterator =
    typeof Symbol === "function"
      ? iterable[Symbol.iterator]()
      : iterable["@@iterator"]();

  const { value, done } = iterator.next();
  return done ? null : value;
}

export default first;
