/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import baseTextTransformAllStrings from "../../helpers/baseTextTransformAllStrings";

import MAWVault from "./MAWVault";

function MAWUnvaultTransform() {
  return function (text) {
    return baseTextTransformAllStrings(text, (a, b) => transform(a, b));
  };
}

function transform(text, b) {
  if (text.length === 0) return [text];
  return MAWVault.isVaulted(text) ? [MAWVault.unvault(text)] : [text];
}

export default MAWUnvaultTransform;
