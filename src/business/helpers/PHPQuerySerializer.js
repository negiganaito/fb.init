/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import deserialize from "./BaseDeserializePHPQueryData";
import flattenPHPQueryData from "./flattenPHPQueryData";

const encodeComponent = (component) => {
  return encodeURIComponent(component)
    .replace(/%5D/g, "]")
    .replace(/%5B/g, "[");
};

const decodeComponent = (component) => {
  try {
    return decodeURIComponent(component.replace(/\+/g, " "));
  } catch (error) {
    return component;
  }
};

const serialize = (data) => {
  const flattenedData = flattenPHPQueryData(data);
  const queryArray = [];

  for (const key in flattenedData) {
    if (Object.prototype.hasOwnProperty.call(flattenedData, key)) {
      const encodedKey = encodeComponent(key);
      if (flattenedData[key] === undefined) {
        queryArray.push(encodedKey);
      } else {
        queryArray.push(
          `${encodedKey}=${encodeComponent(String(flattenedData[key]))}`
        );
      }
    }
  }

  return queryArray.join("&");
};

const _deserialize = (query) => {
  return deserialize(query, decodeComponent);
};

const PHPQuerySerializer = {
  decodeComponent,
  deserialize: _deserialize,
  encodeComponent,
  serialize,
};

export default PHPQuerySerializer;
