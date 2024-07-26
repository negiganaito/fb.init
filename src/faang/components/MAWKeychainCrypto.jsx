/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { FBLogger } from "FBLogger";

import { getAccountKeyString } from "../../helpers/MAWWebInitDataHelpers";
import memoizeOneWithArgs from "../../helpers/memoizeOneWithArgs";

import {
  ADDITIONAL_DATA_LENGTH_IN_BYTES,
  AES_GCM,
  AES_GCM_IV_LENGTH_IN_BYTES,
  AES_GCM_KEY_LENGTH,
  AES_GCM_TAG_LENGTH,
  CIPHER_ID,
  HKDF,
  HKDF_INFO,
  HKDF_SEED_LENGTH_IN_BYTES,
  SHA256,
  VERSION,
} from "./MAWCryptoConsts";
import {
  fromHexString,
  getBufferWithRandomValuesFromLength,
  makeAAD,
  mergeBuffers,
} from "./MAWKeychainUtil";
import { MAWSubtleCrypto } from "./MAWSubtleCrypto";
import { decodeB64, encodeB64 } from "./WABase64";

const ADDITIONAL_DATA = makeAAD(VERSION, CIPHER_ID);

const encryptDataToStringBuffer = async (key, data, additionalData) => {
  const iv = getBufferWithRandomValuesFromLength(AES_GCM_IV_LENGTH_IN_BYTES);
  const aad = additionalData || ADDITIONAL_DATA;

  try {
    const encryptedData = await MAWSubtleCrypto.MAWSubtleCrypto.encrypt(
      {
        additionalData: aad,
        iv: new Uint8Array(iv),
        name: AES_GCM,
        tagLength: AES_GCM_TAG_LENGTH,
      },
      key,
      data
    );

    const mergedData = mergeBuffers([aad, iv, encryptedData]);
    return encodeB64(mergedData);
  } catch (error) {
    throw FBLogger("maw_ear")
      .catching(error)
      .mustfixThrow(
        "Failed to encryptDataToStringBuffer",
        typeof key,
        key.constructor.name
      );
  }
};

const decryptDataToArrayBuffer = async (key, base64String) => {
  const data = new Uint8Array(decodeB64(base64String));
  const additionalDataLength = ADDITIONAL_DATA_LENGTH_IN_BYTES;
  const ivLength = AES_GCM_IV_LENGTH_IN_BYTES;

  const aad = data.subarray(0, additionalDataLength);
  const iv = data.subarray(
    additionalDataLength,
    additionalDataLength + ivLength
  );
  const encryptedData = data.subarray(additionalDataLength + ivLength);

  try {
    const decryptedData = await MAWSubtleCrypto.MAWSubtleCrypto.decrypt(
      {
        additionalData: aad,
        iv: iv,
        name: AES_GCM,
        tagLength: AES_GCM_TAG_LENGTH,
      },
      key,
      encryptedData
    );

    return decryptedData;
  } catch (error) {
    FBLogger("maw_ear")
      .catching(error)
      .mustfix(
        "Failed to decryptDataToArrayBuffer",
        key.constructor.name,
        base64String.length,
        String(error)
      );
    throw error;
  }
};

const getAccountKeyBuffer = (accountKeyString) => {
  const accountKey = getAccountKeyString(accountKeyString);
  const buffer = fromHexString(accountKey);

  if (buffer === null) {
    throw Error(
      `Invalid value for account key. Is empty=${String(
        accountKey.length === 0
      )}`
    );
  }

  return buffer.buffer;
};

const genAccountKey = (accountKeyString) => {
  const buffer = getAccountKeyBuffer(accountKeyString);
  return MAWSubtleCrypto.MAWSubtleCrypto.importKey(
    "raw",
    buffer,
    { name: AES_GCM },
    false,
    ["encrypt", "decrypt"]
  );
};

const genBrowserEncryptionKeyString = () => {
  return encodeB64(
    getBufferWithRandomValuesFromLength(HKDF_SEED_LENGTH_IN_BYTES)
  );
};

const importBrowserEncryptionKey = async (base64Key) => {
  const rawKey = decodeB64(base64Key);

  try {
    const importedKey = await MAWSubtleCrypto.MAWSubtleCrypto.importKey(
      "raw",
      rawKey,
      { name: HKDF },
      false,
      ["deriveKey"]
    );

    return importedKey;
  } catch (error) {
    FBLogger("maw_ear")
      .catching(error)
      .mustfix("Failed to importBrowserEncryptionKey");
    throw error;
  }
};

const genDatabaseEncryptionSeed = () => {
  return getBufferWithRandomValuesFromLength(HKDF_SEED_LENGTH_IN_BYTES);
};

const genDatabaseEncryptionKey = async (key, salt) => {
  try {
    const derivedKey = await MAWSubtleCrypto.MAWSubtleCrypto.deriveKey(
      {
        hash: { name: SHA256 },
        info: HKDF_INFO,
        name: HKDF,
        salt: salt,
      },
      key,
      {
        length: AES_GCM_KEY_LENGTH,
        name: AES_GCM,
      },
      true,
      ["encrypt", "decrypt"]
    );

    return MAWSubtleCrypto.MAWSubtleCrypto.exportKey("raw", derivedKey);
  } catch (error) {
    FBLogger("maw_ear")
      .catching(error)
      .mustfix("Failed to genDatabaseEncryptionKey");
    throw error;
  }
};

const getKeyVersionFromCipherData = (cipherData) => {
  const additionalData = cipherData.slice(0, ADDITIONAL_DATA_LENGTH_IN_BYTES);
  return new DataView(additionalData).getUint8(0);
};

const getKeyVersionFromCipherDataString = (base64CipherData) => {
  return getKeyVersionFromCipherData(decodeB64(base64CipherData));
};

const getAccountKey = memoizeOneWithArgs((accountKeyString) => {
  return genAccountKey(accountKeyString);
});

const generateHashString = async (base64String) => {
  const decodedData = decodeB64(base64String);
  const hash = await MAWSubtleCrypto.MAWSubtleCrypto.digest(
    SHA256,
    decodedData
  );
  return encodeB64(hash);
};

export {
  ADDITIONAL_DATA,
  decryptDataToArrayBuffer,
  encryptDataToStringBuffer,
  genAccountKey,
  genBrowserEncryptionKeyString,
  genDatabaseEncryptionKey,
  genDatabaseEncryptionSeed,
  generateHashString,
  getAccountKey,
  getAccountKeyBuffer,
  getKeyVersionFromCipherData,
  getKeyVersionFromCipherDataString,
  importBrowserEncryptionKey,
};
