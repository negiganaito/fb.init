/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "FBLogger";

import randomInt from "../../helpers/randomInt";
import tweetnacl from "../../helpers/tweetnacl";
import {
  arrayBufferToString,
  stringToArrayBuffer,
} from "../../helpers/WAArrayBufferUtils";

let encryptionKey = null;
let prefixAndSuffix = null;

const setVaultPrefixAndSuffix = (value) => {
  prefixAndSuffix = value;
};

const getVaultEncryptionKey = () => encryptionKey;

const setVaultEncryptionKey = (key) => {
  encryptionKey = key;
};

const clearVaultMaterials = () => {
  encryptionKey = null;
  prefixAndSuffix = null;
};

const hasVaultBeenSetup = () =>
  getVaultEncryptionKey() !== null && getVaultPrefixAndSuffix() !== null;

const generatePrefixAndSuffix = () => {
  const lowerBound = 1e9;
  const upperBound = 9999999999;
  return `${randomInt(lowerBound, upperBound)}##${randomInt(
    lowerBound,
    upperBound
  )}`;
};

const getVaultPrefixAndSuffix = () => prefixAndSuffix;

const getVaultMaterials = () => {
  if (!hasVaultBeenSetup()) {
    throw FBLogger("maw_ear").mustfixThrow("Vault materials are null");
  }
  return { encryptionKey, prefixAndSuffix };
};

const initializeVaultMaterials = (materials) => {
  const previouslySetup = hasVaultBeenSetup();
  FBLogger("maw_ear").debug(
    "Setting vault materials -- vaultMaterials=%s, previouslySetup=%s",
    Boolean(materials).toString(),
    previouslySetup
  );
  if (!previouslySetup) {
    const defaultMaterials = materials || {
      encryptionKey: tweetnacl.randomBytes(32).buffer,
      prefixAndSuffix: generatePrefixAndSuffix(),
    };
    setVaultMaterials(defaultMaterials);
  }
  return getVaultMaterials();
};

const setVaultMaterials = ({ encryptionKey: key, prefixAndSuffix: ps }) => {
  if (!key || !ps) {
    throw FBLogger("maw_ear").mustfixThrow(
      "Cannot set null values for encryption key and prefix"
    );
  }
  setVaultEncryptionKey(key);
  setVaultPrefixAndSuffix(ps);
};

const materialsToString = () => {
  const materials = getVaultMaterials();
  return fromMaterialsToString(materials);
};

const fromMaterialsToString = ({ encryptionKey: key, prefixAndSuffix: ps }) => {
  if (ps && key) {
    const keyString = arrayBufferToString(key);
    return JSON.stringify({ encryptionKey: keyString, prefixAndSuffix: ps });
  } else {
    return "";
  }
};

const fromStringToMaterials = (string) => {
  if (string === "") {
    return null;
  } else {
    const parsed = JSON.parse(string);
    if (!parsed.encryptionKey || !parsed.prefixAndSuffix) {
      throw FBLogger("maw_ear").mustfixThrow(
        "Vault materials were not in correct format"
      );
    }
    const key = stringToArrayBuffer(parsed.encryptionKey);
    const ps = parsed.prefixAndSuffix;
    return { encryptionKey: key, prefixAndSuffix: ps };
  }
};

export {
  fromMaterialsToString,
  fromStringToMaterials,
  getVaultMaterials,
  getVaultPrefixAndSuffix,
  hasVaultBeenSetup,
  initializeVaultMaterials,
  materialsToString,
  clearVaultMaterials as TEST_ONLY_clearVaultMaterials,
};
