/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function getTypedHref(input) {
  if (typeof input === "object" && input !== null && input.url !== null) {
    return { type: "legacy", value: input };
  } else {
    return { type: "modern", value: input };
  }
}

export { getTypedHref };
