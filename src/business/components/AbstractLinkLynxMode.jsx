/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { LinkshimHandlerConfig } from "../helpers/LinkshimHandlerConfig";

import FBLynx from "./FBLynx";

function getMode(isSafeToSkipShim) {
  return isSafeToSkipShim
    ? [LinkshimHandlerConfig.www_safe_js_mode, null]
    : ["hover", null];
}

function setupDelegation() {
  FBLynx.setupDelegation();
}

export { getMode, setupDelegation };
