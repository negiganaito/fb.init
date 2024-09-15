/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { rootStyleSheet } from "./CometStyleXSheet";
import gkx from "./gkx";

let hasWarned = false;

function stylexInject(css, uniqueId, specificityMatcher = null) {
  if (!hasWarned && gkx("20935") && !css.includes("@keyframes")) {
    hasWarned = true;
  }

  rootStyleSheet.insert(css, uniqueId, specificityMatcher);
}

export default stylexInject;
