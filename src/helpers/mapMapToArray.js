/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const mapMapToArray = (map, callback) => {
  const result = [];
  let index = 0;

  for (const [key, value] of map) {
    result.push(callback(value, key, index, map));
    index++;
  }

  return result;
};

export default mapMapToArray;
