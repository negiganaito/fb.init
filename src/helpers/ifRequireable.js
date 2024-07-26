/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ifRequired from "../helpers/ifRequired";

function ifRequireable(moduleId, callback, context) {
  return ifRequired(moduleId, callback, context);
}

export default ifRequireable;
