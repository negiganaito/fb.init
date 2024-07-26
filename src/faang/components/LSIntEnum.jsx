/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ofFloat, toFloat } from "../../business/helpers/I64";

const enumMap = new Map();

/**
 * Converts a number to an LSIntEnum.
 * @param value The number to convert.
 * @returns The LSIntEnum representation of the number.
 */
function ofNumber(value) {
  let enumValue = enumMap.get(value);
  if (enumValue !== undefined) return enumValue;

  enumValue = ofFloat(value);
  enumMap.set(value, enumValue);
  return enumValue;
}

/**
 * Converts an LSIntEnum to a number.
 * @param enumValue The LSIntEnum to convert.
 * @returns The number representation of the LSIntEnum.
 */
function toNumber(enumValue) {
  return toFloat(enumValue);
}

/**
 * Unwraps an LSIntEnum to a number.
 * @param enumValue The LSIntEnum to unwrap.
 * @returns The unwrapped number value.
 */
function unwrapIntEnum(enumValue) {
  return toFloat(enumValue);
}

export { ofNumber, toNumber, unwrapIntEnum };
