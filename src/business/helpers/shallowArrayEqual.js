/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import isNullish from "./isNullish";

function shallowArrayEqual(array1, array2) {
  if (array1 === array2) return true;
  if (isNullish(array1) || isNullish(array2) || array1.length !== array2.length)
    return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

export default shallowArrayEqual;
