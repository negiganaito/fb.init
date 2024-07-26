/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable max-depth */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import nullthrows from "fbjs/lib/nullthrows";

import { AnalyticsCoreData } from "./AnalyticsCoreData";
import BaseEventEmitter from "./BaseEventEmitter";
import generateGuid from "./guid";
import performanceAbsoluteNow from "./performanceAbsoluteNow";
import { maybeOnBeforeUnload, onUnload } from "./Run";
import WebStorage from "./WebStorage";
import WebStorageMutex from "./WebStorageMutex";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const INACTIVITY_THRESHOLD_MS = 30 * 1000;
const eventEmitter = new BaseEventEmitter();
let localStorageCache;

function getLocalStorage(activateExperiment = false) {
  if (localStorageCache === undefined) {
    let isExperimentActive =
      (AnalyticsCoreData.queue_activation_experiment ?? false) &&
      activateExperiment;
    if (isExperimentActive) {
      try {
        return WebStorage.getLocalStorageForRead();
      } catch {
        return null;
      }
    }
    const testKey = "check_quota";
    try {
      const storage = WebStorage.getLocalStorage();
      if (storage) {
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        localStorageCache = storage;
      } else {
        localStorageCache = null;
      }
    } catch {
      localStorageCache = null;
    }
  }
  return localStorageCache;
}

function detachNode(node) {
  const { prev, next } = node;
  if (next) next.prev = prev;
  if (prev) prev.next = next;
  node.next = null;
  node.prev = null;
}

function createNode(item) {
  return { item, next: null, prev: null };
}

function getFullName(queueName, options) {
  return `${queueName}^$${options?.queueNameSuffix ?? ""}`;
}

const queues = {};
const queueHandlers = {};
const queueLists = {};
let isQueueActivateExperimentEnabled = false;

class PersistedQueue {
  constructor(queueName, options = {}) {
    this.queueName = queueName;
    this.queueNameSuffix = options.queueNameSuffix ?? "";
    this.application = options.application;
    this.fullName = getFullName(queueName, options);
    this.uniqueName = `${this.fullName}^$${generateGuid()}`;
    this.isActiveFlag = false;
    this.maxAgeMs = options.max_age_in_ms ?? DAY_IN_MS;
    this.migrate = options.migrate;
    this.onLoad = options.onLoad;

    this.queueLength = 0;
    this.head = null;
    this.tail = null;
    this.activeSince = null;
    this.storageHandlers = [
      eventEmitter.addListener("active", () => {
        if (this.activeSince !== null || !this.isActiveFlag) {
          this.isActiveFlag = true;
          this.activeSince = null;
          this.sync();
        }
      }),
      eventEmitter.addListener("inactive", () => {
        if (this.activeSince === null) {
          this.activeSince = Date.now();
          this.persist();
        }
      }),
    ];

    if (ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker) {
      requestAnimationFrame(() => this.sync());
    }
  }

  static isQueueActivateExperiment() {
    return isQueueActivateExperimentEnabled;
  }

  static setOnQueueActivateExperiment() {
    isQueueActivateExperimentEnabled = true;
  }

  static create(queueName, options) {
    const fullName = getFullName(queueName, options);
    if (queues[fullName]) throw Error(`Duplicate queue created: ${queueName}`);
    const queue = new PersistedQueue(queueName, options);
    queues[fullName] = queue;
    queueLists[queueName]
      ? queueLists[queueName].push(queue)
      : (queueLists[queueName] = [queue]);
    const handler = queueHandlers[queueName];
    if (handler) queue.setHandler(handler);
    return queue;
  }

  static setHandler(queueName, handler) {
    if (queueLists[queueName]) {
      for (const queue of queueLists[queueName]) {
        queue.setHandler(handler);
      }
    }
    queueHandlers[queueName] = handler;
  }

  destroy() {
    for (const handler of this.storageHandlers) {
      handler.remove();
    }
  }

  static destroy(queueName, options) {
    const fullName = getFullName(queueName, options);
    queues[fullName].destroy();
    delete queues[fullName];
  }

  isActive() {
    if (this.activeSince === null) return true;
    if (Date.now() - this.activeSince > INACTIVITY_THRESHOLD_MS) {
      this.activeSince = null;
      eventEmitter.emit("active", null);
      return true;
    }
    return false;
  }

  sync() {
    this.loadItems();
    this.processQueue();
  }

  persist() {
    this.saveItems();
  }

  getFullName() {
    return this.fullName;
  }

  getQueueNameSuffix() {
    return this.queueNameSuffix;
  }

  setHandler(handler) {
    this.handler = handler;
    this.processQueue();
    return this;
  }

  processQueue() {
    if (this.queueLength > 0 && this.handler) {
      this.handler(this);
    }
  }

  length() {
    return this.queueLength;
  }

  enumeratedLength() {
    return this.enumerateItems().length;
  }

  static isPersistenceAllowed() {
    return !!getLocalStorage();
  }

  static getSuffixesForKey(queueName) {
    const suffixes = [];
    try {
      const storage = getLocalStorage(true);
      if (!storage) return suffixes;
      const prefix = `${queueName}^$`;
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (typeof key === "string" && key.startsWith("mutex_falco_")) {
          storage.removeItem(key);
        } else if (typeof key === "string" && key.startsWith(prefix)) {
          const parts = key.split("^$");
          if (parts.length > 2) {
            suffixes.push(parts[1]);
          } else {
            suffixes.push("");
          }
        }
      }
    } catch {}
    return suffixes;
  }

  loadItems() {
    const storage = getLocalStorage(true);
    if (!storage) return;
    const prefix = `${this.fullName}^$`;
    const mutex = new WebStorageMutex(this.application ?? prefix);
    mutex.lock(() => {
      const expireTime = Date.now() - this.maxAgeMs;
      try {
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (typeof key === "string" && key.startsWith(prefix)) {
            const item = storage.getItem(key);
            storage.removeItem(key);
            if (item && item.startsWith("{")) {
              const parsed = JSON.parse(nullthrows(item));
              if (parsed.ts > expireTime) {
                try {
                  for (const itm of parsed.items) {
                    this.migrate?.(itm);
                    this.onLoad?.(itm);
                    this.enqueueItem(itm);
                  }
                } catch {}
              }
            }
          }
        }
      } catch {}
      mutex.unlock();
      this.processQueue();
    });
  }

  saveItems() {
    const storage = getLocalStorage();
    if (!storage) return;
    const items = this.enumerateItems();
    if (items.length === 0) {
      storage.getItem(this.uniqueName) !== null &&
        storage.removeItem(this.uniqueName);
      return;
    }
    WebStorage.setItemGuarded(
      storage,
      this.uniqueName,
      JSON.stringify({
        items: items.map((item) => item),
        ts: performanceAbsoluteNow(),
      })
    );
  }

  enumerateItems() {
    const items = [];
    let node = this.head;
    while (node) {
      items.push(node.item);
      node = node.prev;
    }
    return items.reverse();
  }

  markItemAsCompleted(node) {
    const { prev } = node;
    detachNode(node);
    if (this.head === node) {
      this.head = prev;
    }
    this.queueLength--;
    if (!this.isActive()) {
      this.saveItems();
    }
  }

  markItemAsFailed(node) {
    detachNode(node);
    const { prev } = this.tail;
    if (prev) {
      prev.next = node;
      node.prev = prev;
    }
    node.next = this.tail;
    this.tail.prev = node;
    this.tail = node;
    if (this.isActive()) {
      this.processQueue();
    }
  }

  markItem(node, isSuccess) {
    isSuccess ? this.markItemAsCompleted(node) : this.markItemAsFailed(node);
  }

  enqueueItem(item) {
    const node = createNode(item);
    if (this.head) {
      this.head.next = node;
      node.prev = this.head;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.queueLength++;
  }

  wrapAndEnqueueItem(item) {
    this.enqueueItem(item);
    this.isActive() ? this.processQueue() : this.saveItems();
  }

  dequeueItem() {
    if (this.activeSince !== null) return null;
    const node = this.tail;
    if (!node) return null;
    this.tail = node.next;
    return node;
  }
}

if (ExecutionEnvironment.canUseDOM) {
  let beforeUnloadHandler = maybeOnBeforeUnload(() => {
    eventEmitter.emit("inactive", null);
    beforeUnloadHandler?.remove();
  }, false);
  if (!beforeUnloadHandler) {
    let unloadHandler = onUnload(() => {
      eventEmitter.emit("inactive", null);
      unloadHandler.remove();
    });
  }
}

export default PersistedQueue;
export { eventEmitter };
