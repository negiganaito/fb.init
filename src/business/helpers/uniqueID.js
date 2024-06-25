/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const PREFIX = "js_";
const RADIX = 36;
let counter = 0;

function uniqueID(prefix = PREFIX, addRandomSuffix = false) {
  return addRandomSuffix ? prefix : prefix + (counter++).toString(RADIX);
}

export default uniqueID;
