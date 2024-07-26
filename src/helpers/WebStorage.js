/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "FBLogger";

import CookieConsent from "./CookieConsent";
import { isStorageQuotaExceededError } from "./isQuotaExceededError";

let cookieConsentInstance;
let localStorageCache = {};
let sessionStorageCache = {};
const LOCAL_STORAGE = "localStorage";
const SESSION_STORAGE = "sessionStorage";
let hasLoggedMissingConsentWarning = false;
// eslint-disable-next-line no-restricted-globals
const globalContext = typeof window !== "undefined" ? window : self;

function getOrInitializeStorage(cache, initializer, storageType) {
  if (!cookieConsentInstance) {
    cookieConsentInstance = CookieConsent.isFirstPartyStorageAllowed();
  }

  if (!cookieConsentInstance) {
    if (!hasLoggedMissingConsentWarning) {
      FBLogger("web_storage").warn(
        "Failed to get %s because of missing cookie consent",
        storageType
      );
      hasLoggedMissingConsentWarning = true;
    }
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(cache, storageType)) {
    cache[storageType] = initializer(storageType);
  }

  return cache[storageType];
}

function getStorageForRead(storageType) {
  try {
    return globalContext[storageType];
  } catch (error) {
    FBLogger("web_storage").warn(
      "Failed to get storage for read %s",
      error.message
    );
  }
  return null;
}

function initializeStorage(storageType) {
  let storage = null;
  try {
    storage = globalContext[storageType];
    if (
      storage &&
      typeof storage.setItem === "function" &&
      typeof storage.removeItem === "function"
    ) {
      const testKey = `__test__${Date.now()}`;
      storage.setItem(testKey, "");
      storage.removeItem(testKey);
    } else {
      return null;
    }
  } catch (error) {
    if (!isStorageQuotaExceededError(storage, error)) {
      FBLogger("web_storage")
        .catching(error)
        .warn("Failed to get WebStorage of type `%s`", storageType);
      return null;
    }
  }
  return storage;
}

function isStorageQuotaExceeded(storageType) {
  let storage = null;
  try {
    storage = globalContext[storageType];
    if (
      storage &&
      typeof storage.setItem === "function" &&
      typeof storage.removeItem === "function"
    ) {
      const testKey = `__test__${Date.now()}`;
      storage.setItem(testKey, "");
      storage.removeItem(testKey);
    }
  } catch (error) {
    if (isStorageQuotaExceededError(storage, error)) {
      return true;
    }
  }
  return false;
}

function getStorageKeys(storage) {
  const keys = [];
  for (let i = 0; i < storage.length; i++) {
    keys.push(storage.key(i) || "");
  }
  return keys;
}

function setItemGuarded(storage, key, value) {
  if (!storage) {
    return new Error("storage cannot be null");
  }

  try {
    storage.setItem(key, value);
  } catch (error) {
    const storedItems = getStorageKeys(storage).map((itemKey) => {
      const itemSize = (storage.getItem(itemKey) || "").length;
      return `${itemKey}(${itemSize})`;
    });

    return Error(
      "%sStorage quota exceeded while setting %s(%s). Items(length) follows: %s",
      error.name ? `${error.name}: ` : "",
      key,
      value.length,
      storedItems.join(", ")
    );
  }

  return null;
}

const WebStorage = {
  getLocalStorage() {
    return getOrInitializeStorage(
      localStorageCache,
      initializeStorage,
      LOCAL_STORAGE
    );
  },

  getAllowlistedKeyFromLocalStorage(key) {
    const storage = getOrInitializeStorage(
      sessionStorageCache,
      getStorageForRead,
      LOCAL_STORAGE
    );
    return storage ? storage.getItem(key) : undefined;
  },

  getSessionStorage() {
    return getOrInitializeStorage(
      localStorageCache,
      initializeStorage,
      SESSION_STORAGE
    );
  },

  getAllowlistedKeyFromSessionStorage(key) {
    const storage = getOrInitializeStorage(
      sessionStorageCache,
      getStorageForRead,
      SESSION_STORAGE
    );
    return storage ? storage.getItem(key) : undefined;
  },

  getLocalStorageForRead() {
    return getOrInitializeStorage(
      sessionStorageCache,
      getStorageForRead,
      LOCAL_STORAGE
    );
  },

  getSessionStorageForRead() {
    return getOrInitializeStorage(
      sessionStorageCache,
      getStorageForRead,
      SESSION_STORAGE
    );
  },

  isLocalStorageQuotaExceeded() {
    return isStorageQuotaExceeded(LOCAL_STORAGE);
  },

  isSessionStorageQuotaExceeded() {
    return isStorageQuotaExceeded(SESSION_STORAGE);
  },

  setItemGuarded,

  setAllowlistedKeyToLocalStorage(storage, key, value) {
    return setItemGuarded(storage, key, value);
  },

  clearCaches() {
    localStorageCache = {};
    sessionStorageCache = {};
  },
};

export default WebStorage;
