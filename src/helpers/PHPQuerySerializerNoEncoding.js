/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import deserialize from "./BaseDeserializePHPQueryData";
import flattenPHPQueryData from "./flattenPHPQueryData";

const encodeComponent = (a) => a;

const serialize = (a) => {
  const b = [];
  const flatData = flattenPHPQueryData(a);
  for (const d in flatData) {
    if (Object.prototype.hasOwnProperty.call(flatData, d)) {
      const e = encodeComponent(d);
      flatData[d] === undefined
        ? b.push(e)
        : b.push(`${e}=${encodeComponent(String(flatData[d]))}`);
    }
  }
  return b.join("&");
};

const decodeComponent = (a) => a;

const _deserialize = (a) => deserialize(a, decodeComponent);

const PHPQuerySerializerNoEncoding = {
  decodeComponent,
  deserialize: _deserialize,
  encodeComponent,
  serialize,
};

export default PHPQuerySerializerNoEncoding;
