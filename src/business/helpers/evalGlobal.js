/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function evalGlobal(scriptContent) {
  if (typeof scriptContent !== "string") {
    throw new TypeError(
      "JS sent to evalGlobal is not a string. Only strings are permitted."
    );
  }
  if (!scriptContent) return;

  const scriptElement = document.createElement("script");
  try {
    scriptElement.appendChild(document.createTextNode(scriptContent));
  } catch (error) {
    scriptElement.text = scriptContent;
  }

  const parentElement =
    document.getElementsByTagName("head")[0] || document.documentElement;
  parentElement.appendChild(scriptElement);
  parentElement.removeChild(scriptElement);
}

export default evalGlobal;
