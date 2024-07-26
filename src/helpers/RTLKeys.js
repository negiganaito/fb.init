/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Locale from "fbjs/lib/Locale";

import Keys from "./Keys";

let isRTLCache = null;

function isRTL() {
  if (isRTLCache === null) {
    isRTLCache = Locale.isRTL();
  }
  return isRTLCache;
}

const { RIGHT: REAL_RIGHT, LEFT: REAL_LEFT, ...otherKeys } = Keys;

const RTLKeys = {
  ...otherKeys,
  REAL_RIGHT,
  REAL_LEFT,
  getLeft() {
    return isRTL() ? REAL_RIGHT : REAL_LEFT;
  },
  getRight() {
    return isRTL() ? REAL_LEFT : REAL_RIGHT;
  },
};

export default RTLKeys;
