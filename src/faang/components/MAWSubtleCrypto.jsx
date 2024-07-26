/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// eslint-disable-next-line no-restricted-globals
const crypto = self.crypto;
const subtleCrypto =
  crypto && (crypto.subtle || crypto.webkitSubtle || crypto.subtle);

export const MAWSubtleCrypto = subtleCrypto;
