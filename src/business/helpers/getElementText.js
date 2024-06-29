/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
__d(
  "getElementText",
  ["isElementNode", "isTextNode"],
  (a, b, c, d, e, f, g) => {
    let h = null;
    function a(a) {
      if (c("isTextNode")(a)) return a.data;
      else if (c("isElementNode")(a)) {
        if (h === null) {
          let b = document.createElement("div");
          h = b.textContent != null ? "textContent" : "innerText";
        }
        return a[h];
      } else return "";
    }
    g["default"] = a;
  },
  98
);
