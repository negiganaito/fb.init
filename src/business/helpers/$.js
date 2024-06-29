/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function getElementByIdOrElement(idOrElement) {
  return validateElement(
    idOrElement,
    typeof idOrElement === "string"
      ? document.getElementById(idOrElement)
      : idOrElement
  );
}

function fromIDOrElement(idOrElement) {
  return validateElement(
    idOrElement,
    typeof idOrElement === "string"
      ? document.getElementById(idOrElement)
      : idOrElement
  );
}

function validateElement(idOrElement, element) {
  if (!element) {
    const error = console.error(
      `Tried to get element with id of "${String(
        idOrElement
      )}" but it is not present on the page`
    );
    // error.taalOpcodes = error.taalOpcodes || [];
    // error.taalOpcodes = [fbErrorLite.TAALOpcode.PREVIOUS_FILE];
    throw error;
  }
  return element;
}

export default getElementByIdOrElement;
export { fromIDOrElement };
