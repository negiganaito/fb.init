/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const id = { contents: 0 };

function create(name) {
  id.contents += 1;
  return `${name}/${id.contents}`;
}

function camlIsExtension(ex) {
  return ex !== null && typeof ex.RE_EXN_ID === "string";
}

function camlExnSlotName(ex) {
  return ex.RE_EXN_ID;
}

export { camlExnSlotName, camlIsExtension, create, id };
