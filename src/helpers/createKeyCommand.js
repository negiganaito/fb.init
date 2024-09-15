/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const MODIFIER_KEYS = ["alt", "command", "shift"];

const createKeyCommand = (keyConfig) => {
  return MODIFIER_KEYS.filter((modifier) => keyConfig?.[modifier] === true)
    .concat(keyConfig?.key)
    .join(" ");
};

export default createKeyCommand;
