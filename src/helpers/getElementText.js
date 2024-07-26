/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import isTextNode from "fbjs/lib/isTextNode";

import isElementNode from "./isElementNode";

let textProp = null;

function getElementText(node) {
  if (isTextNode(node)) {
    return node.data;
  } else if (isElementNode(node)) {
    if (textProp === null) {
      const div = document.createElement("div");
      textProp = div.textContent !== null ? "textContent" : "innerText";
    }
    return node[textProp];
  } else {
    return "";
  }
}

export default getElementText;
