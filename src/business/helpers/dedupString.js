/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const dedupString = (str) => {
  const obj = {};
  obj[str] = 0;
  return Object.keys(obj)[0];
};

export default dedupString;
