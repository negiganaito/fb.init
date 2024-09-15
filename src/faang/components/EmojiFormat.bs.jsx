/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const codeStringToCodeArray = (codeString) =>
  codeString.split("_").map((code) => parseInt(code, 16));

const codeArrayToCodeString = (codeArray) =>
  codeArray.map((code) => code.toString(16)).join("_");

const codeArrayToUnicode = (codeArray) =>
  codeArray.map((code) => String.fromCodePoint(code)).join("");

const codeStringToUnicode = (codeString) =>
  codeArrayToUnicode(codeStringToCodeArray(codeString));

export {
  codeArrayToCodeString,
  codeArrayToUnicode,
  codeStringToCodeArray,
  codeStringToUnicode,
};
