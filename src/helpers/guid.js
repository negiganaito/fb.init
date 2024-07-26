/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function generateGuid() {
  if (
    typeof crypto === "object" &&
    typeof crypto.getRandomValues === "function" &&
    typeof String.prototype.padStart === "function"
  ) {
    const array = crypto.getRandomValues(new Uint32Array(2));
    return (
      "f" +
      array[0].toString(16).padStart(8, "0") +
      array[1].toString(16).padStart(8, "0")
    );
  }
  return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "");
}

export default generateGuid;
