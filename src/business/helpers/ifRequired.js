/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function ifRequired(moduleId, callback, fallback) {
  let module;

  if (typeof require === "function") {
    try {
      module = require(moduleId);
    } catch (err) {
      module = null;
    }
  }

  if (module && callback) {
    return callback(module);
  } else if (!module && fallback) {
    return fallback();
  }
}

export default ifRequired;
