/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "FBLogger";
import gkx from "gkx";

import { decryptTweetNaCl, encryptTweetNaCl } from "./MAWKeychainNaClCrypto";
import {
  getVaultMaterials,
  getVaultPrefixAndSuffix,
  hasVaultBeenSetup,
} from "./MAWVaultMaterials";

const vaultCache = new Map();
const unvaultCache = new Map();

const isVaulted = (value) => {
  if (!gkx("23909")) return false;
  const prefixAndSuffix = getVaultPrefixAndSuffix();
  return prefixAndSuffix
    ? new RegExp(`${prefixAndSuffix}.*${prefixAndSuffix}`).test(value)
    : false;
};

const unvault = (value, strict = false) => {
  if (!gkx("23909")) return value;

  if (isVaulted(value)) {
    const { encryptionKey, prefixAndSuffix } = getVaultMaterials();
    if (!prefixAndSuffix)
      throw FBLogger("maw_ear").mustfixThrow(
        "Vault prefix and suffix should not be null when unvaulting"
      );

    const match = value.match(
      new RegExp(`${prefixAndSuffix}(.*)${prefixAndSuffix}`)
    );
    if (!match || match.length !== 2)
      throw FBLogger("maw_ear").mustfixThrow(
        "Could not retrieve inner value to unvault"
      );
    if (!encryptionKey)
      throw FBLogger("maw_ear").mustfixThrow(
        "Vault encryption key was null before unvaulting"
      );

    const innerValue = match[1];
    const fullValue = `${prefixAndSuffix}${innerValue}${prefixAndSuffix}`;
    const decryptedValue = decrypt(encryptionKey, innerValue);

    return value.replace(fullValue, () => decryptedValue);
  }

  if (strict) {
    const isInvalidVault = /^[0-9]{10}##[0-9]{10}.*[0-9]{10}##[0-9]{10}$/.test(
      value
    );
    if (isInvalidVault)
      throw FBLogger("maw_ear").mustfixThrow(
        "Encountered vaulted value with incorrect key."
      );
  }

  return value;
};

const vault = (value) => {
  if (value === "") return value;
  if (!gkx("23909")) return value;

  if (!hasVaultBeenSetup()) {
    FBLogger("maw_ear").mustfix(
      "Attempted to vault value while materials were not setup"
    );
    return value;
  }

  if (isVaulted(value)) {
    FBLogger("maw_ear").warn(
      "Attempted to vault value that's already been vaulted"
    );
    return value;
  }

  const { encryptionKey, prefixAndSuffix } = getVaultMaterials();
  if (!prefixAndSuffix || !encryptionKey)
    throw FBLogger("maw_ear").mustfixThrow(
      "Cannot vault before vault materials are set"
    );

  const encryptedValue = encrypt(encryptionKey, value);
  return `${prefixAndSuffix}${encryptedValue}${prefixAndSuffix}`;
};

const unvaultOrThrow = (value) => {
  if (!gkx("23909")) return value;
  if (!isVaulted(value))
    throw FBLogger("maw_ear").mustfixThrow("Value should be vaulted");
  return unvault(value);
};

const encrypt = (key, value) => {
  const cachedValue = vaultCache.get(value);
  if (cachedValue) return cachedValue;

  const encodedValue = new TextEncoder().encode(value).buffer;
  const encryptedValue = encryptTweetNaCl(key, new Uint8Array(encodedValue));

  vaultCache.set(value, encryptedValue);
  unvaultCache.set(encryptedValue, value);

  return encryptedValue;
};

const decrypt = (key, value) => {
  const cachedValue = unvaultCache.get(value);
  if (cachedValue) return cachedValue;

  const decryptedValue = new TextDecoder().decode(decryptTweetNaCl(key, value));

  vaultCache.set(decryptedValue, value);
  unvaultCache.set(value, decryptedValue);

  return decryptedValue;
};

export { isVaulted, unvault, unvaultOrThrow, vault };
