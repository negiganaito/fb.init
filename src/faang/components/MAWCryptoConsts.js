/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;
const HKDF_SEED_LENGTH_IN_BYTES = 32;
const HKDF_INFO = new Uint8Array(0).buffer;
const AES_GCM_TAG_LENGTH = 128;
const AES_GCM_KEY_LENGTH = 256;
const AES_GCM_IV_LENGTH_IN_BYTES = 12;
const VERSION = 1;
const CIPHER_ID = 2;
const ADDITIONAL_DATA_LENGTH_IN_BYTES = 2;
const ENC_KEY_TTL = ONE_DAY * 30 * 6;
const MAX_KEYCHAIN_SETUP_RETRIES = 3;
const AES_GCM = "AES-GCM";
const HKDF = "HKDF";
const SHA256 = "SHA-256";

export {
  ADDITIONAL_DATA_LENGTH_IN_BYTES,
  AES_GCM,
  AES_GCM_IV_LENGTH_IN_BYTES,
  AES_GCM_KEY_LENGTH,
  AES_GCM_TAG_LENGTH,
  CIPHER_ID,
  ENC_KEY_TTL,
  HKDF,
  HKDF_INFO,
  HKDF_SEED_LENGTH_IN_BYTES,
  MAX_KEYCHAIN_SETUP_RETRIES,
  SHA256,
  VERSION,
};
