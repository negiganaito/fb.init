/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const REACT_ELEMENT_TYPE =
  (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) ||
  60103;
let shouldUseObjectDefineProperty = false;

const FbtReactUtil = {
  REACT_ELEMENT_TYPE,
  injectReactShim: (element) => {
    const store = { validated: true };
    if (shouldUseObjectDefineProperty) {
      Object.defineProperty(element, "_store", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: store,
      });
    } else {
      element._store = store;
    }
  },
};

export default FbtReactUtil;
