/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function createObjectFrom(keys, values = true) {
  const obj = {};
  if (Array.isArray(values)) {
    for (let i = keys.length - 1; i >= 0; i--) {
      obj[keys[i]] = values[i];
    }
  } else {
    for (let i = keys.length - 1; i >= 0; i--) {
      obj[keys[i]] = values;
    }
  }
  return obj;
}

export default createObjectFrom;
