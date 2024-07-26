/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const { HTMLElement, HTMLInputElement } = window;

function xplatToDOMRef(ref) {
  return function (element) {
    element = HTMLElement && element instanceof HTMLElement ? element : null;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref !== null && typeof ref === "object") {
      ref.current = element;
    }
  };
}

function xplatToInputRef(ref) {
  return function (element) {
    element =
      HTMLInputElement && element instanceof HTMLInputElement ? element : null;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref !== null && typeof ref === "object") {
      ref.current = element;
    }
  };
}

export { xplatToDOMRef, xplatToInputRef };
