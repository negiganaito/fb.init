/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

const flattenPHPQueryData = (data) => {
  return flatten(data, "", {});
};

const flatten = (data, prefix, result) => {
  if (data === null) {
    result[prefix] = undefined;
  } else if (typeof data === "object") {
    invariant(typeof data.appendChild !== "function", "Error: 2616");
    for (const key in data) {
      if (
        key !== "$$typeof" &&
        Object.prototype.hasOwnProperty.call(data, key) &&
        data[key] !== undefined
      ) {
        flatten(data[key], prefix ? `${prefix}[${key}]` : key, result);
      }
    }
  } else {
    result[prefix] = data;
  }
  return result;
};

export default flattenPHPQueryData;
