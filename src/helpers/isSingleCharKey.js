/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const SINGLE_CHAR_REGEX = /^[a-z0-9/]$/;

const isSingleCharKey = (key) => {
  return key !== null ? SINGLE_CHAR_REGEX.test(key) : false;
};

export default isSingleCharKey;
