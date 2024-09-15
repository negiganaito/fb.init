/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { and_, equal, lognot, or_, zero } from "../../helpers/I64";

function hasFlag(value, flag) {
  return equal(and_(flag, value), flag);
}

function setFlag(value, flag) {
  return or_(flag, value);
}

function clearFlag(value, flag) {
  return and_(flag, lognot(value));
}

const emptyFlag = zero;

export {
  clearFlag as clear,
  emptyFlag as empty,
  hasFlag as has,
  setFlag as set,
};
