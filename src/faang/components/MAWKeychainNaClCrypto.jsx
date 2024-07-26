/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import nacl from "tweetnacl";

import { ADDITIONAL_DATA_LENGTH_IN_BYTES } from "./MAWCryptoConsts";
import { ADDITIONAL_DATA } from "./MAWKeychainCrypto";
import { decodeB64, encodeB64 } from "./WABase64";

class EARDecryptionError extends Error {
  constructor(message) {
    super(message);
    this.name = "EARError";
  }
}

const encryptTweetNaClArrayBuffer = (
  key,
  message,
  additionalData = ADDITIONAL_DATA
) => {
  const additionalDataArray = new Uint8Array(additionalData);
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const encryptedMessage = nacl.secretbox(message, nonce, new Uint8Array(key));

  const result = new Uint8Array(
    ADDITIONAL_DATA_LENGTH_IN_BYTES + nonce.length + encryptedMessage.length
  );

  result.set(additionalDataArray);
  result.set(nonce, ADDITIONAL_DATA_LENGTH_IN_BYTES);
  result.set(encryptedMessage, ADDITIONAL_DATA_LENGTH_IN_BYTES + nonce.length);

  return result.buffer;
};

const encryptTweetNaCl = (key, message, additionalData) => {
  return encodeB64(encryptTweetNaClArrayBuffer(key, message, additionalData));
};

const decryptTweetNaClArrayBuffer = (key, message, keyVersion) => {
  const additionalDataLength = ADDITIONAL_DATA_LENGTH_IN_BYTES;
  const nonceLength = nacl.secretbox.nonceLength;

  message.slice(0, additionalDataLength);
  const nonce = message.slice(
    additionalDataLength,
    additionalDataLength + nonceLength
  );
  const encryptedMessage = message.slice(
    additionalDataLength + nonceLength,
    additionalDataLength + nonceLength + 4 * Math.ceil(message.byteLength / 3)
  );

  const decryptedMessage = nacl.secretbox.open(
    new Uint8Array(encryptedMessage),
    new Uint8Array(nonce),
    new Uint8Array(key)
  );

  if (decryptedMessage === null) {
    throw new EARDecryptionError(
      `decryptTweetNaCl was unable to decrypt an entity. Attempting to use key version: ${
        keyVersion !== null ? keyVersion : "non-provided"
      }.`
    );
  }

  return decryptedMessage;
};

const decryptTweetNaCl = (key, message, keyVersion) => {
  return decryptTweetNaClArrayBuffer(key, decodeB64(message), keyVersion);
};

const encrypt = (key, message, additionalData) => {
  return encryptTweetNaCl(key, message, additionalData);
};

const decrypt = (key, message, keyVersion) => {
  return decryptTweetNaCl(key, message, keyVersion);
};

export {
  decrypt,
  decryptTweetNaCl,
  decryptTweetNaClArrayBuffer,
  EARDecryptionError,
  encrypt,
  encryptTweetNaCl,
  encryptTweetNaClArrayBuffer,
};
