/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import flattenPHPQueryData from "./flattenPHPQueryData";
import PHPQuerySerializer from "./PHPQuerySerializer";

const encodeComponent = (str) => encodeURIComponent(str);

const serialize = (data) => {
  const flattenedData = flattenPHPQueryData(data);
  const queryString = [];

  for (const key in flattenedData) {
    if (Object.prototype.hasOwnProperty.call(flattenedData, key)) {
      const encodedKey = encodeComponent(key);
      if (flattenedData[key] === undefined) {
        queryString.push(encodedKey);
      } else {
        queryString.push(
          `${encodedKey}=${encodeComponent(String(flattenedData[key]))}`
        );
      }
    }
  }

  return queryString.join("&");
};

const PHPStrictQuerySerializer = {
  serialize,
  encodeComponent,
  deserialize: PHPQuerySerializer.deserialize,
  decodeComponent: PHPQuerySerializer.decodeComponent,
};

export default PHPStrictQuerySerializer;
