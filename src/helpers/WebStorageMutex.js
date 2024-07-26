/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import pageID from "./pageID";
import WebStorage from "./WebStorage";

let localStorageInstance = null;
let isInitialized = false;
let currentPageID = pageID;

function initializeLocalStorage() {
  if (!isInitialized) {
    isInitialized = true;
    localStorageInstance = WebStorage.getLocalStorage();
  }
  return localStorageInstance;
}

class WebStorageMutex {
  constructor(name) {
    this.name = name;
    this.lockTimeoutID = null;
  }

  static testSetPageID(newPageID) {
    currentPageID = newPageID;
  }

  getLockHolder() {
    const storage = initializeLocalStorage();
    if (!storage) return currentPageID;
    const mutexValue = storage.getItem(`mutex_${this.name}`);
    const [holderPageID, expiryTime] = (mutexValue ?? "").split(":");
    return parseInt(expiryTime, 10) >= Date.now() ? holderPageID : null;
  }

  setLock(duration = 1000) {
    const storage = initializeLocalStorage();
    if (!storage) return;
    const expiryTime = Date.now() + duration;
    WebStorage.setItemGuarded(
      storage,
      `mutex_${this.name}`,
      `${currentPageID}:${expiryTime}`
    );
  }

  hasLock() {
    return this.getLockHolder() === currentPageID;
  }

  lock(onSuccess, onFailure, duration) {
    if (this.lockTimeoutID) {
      clearTimeout(this.lockTimeoutID);
    }
    if (this.getLockHolder() === currentPageID) {
      this.setLock(duration);
    }
    this.lockTimeoutID = setTimeout(() => {
      this.lockTimeoutID = null;
      const callback = this.hasLock() ? onSuccess : onFailure;
      if (callback) {
        callback(this);
      }
    }, 0);
  }

  unlock() {
    if (this.lockTimeoutID) {
      clearTimeout(this.lockTimeoutID);
    }
    const storage = initializeLocalStorage();
    if (storage && this.hasLock()) {
      storage.removeItem(`mutex_${this.name}`);
    }
  }
}

export default WebStorageMutex;
