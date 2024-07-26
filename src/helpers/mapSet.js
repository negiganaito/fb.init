/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const mapSet = (set, callback) => {
  const resultSet = new Set();

  for (const value of set) {
    resultSet.add(callback(value));
  }

  return resultSet;
};

export default mapSet;
