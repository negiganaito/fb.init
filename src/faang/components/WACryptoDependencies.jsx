/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import nacl from "tweetnacl";

// eslint-disable-next-line no-restricted-globals
let crypto = self.crypto;

const setCrypto = (newCrypto) => {
  crypto = newCrypto;
  const chunkSize = 65536;
  nacl.setPRNG((x, n) => {
    const buffer = new Uint8Array(n);
    for (let i = 0; i < n; i += chunkSize) {
      newCrypto.getRandomValues(
        buffer.subarray(i, i + Math.min(n - i, chunkSize))
      );
    }
    for (let i = 0; i < n; i++) {
      x[i] = buffer[i];
    }
    buffer.fill(0);
  });
};

const getCrypto = () => {
  return crypto;
};

export { getCrypto, setCrypto };
