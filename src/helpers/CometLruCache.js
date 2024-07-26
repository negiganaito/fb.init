/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

class CometLruCache {
  constructor(capacity, ttl) {
    this.capacity = capacity;
    this.ttl = ttl;

    if (capacity <= 0) {
      console.log(
        "CometLruCache: Unable to create instance of cache with zero or negative capacity.",
        "CometLruCache"
      );
    }

    this.cache = new Map();
  }

  set(key, value) {
    this.cache.delete(key);
    this.cache.set(key, { timestamp: Date.now(), value });

    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next();
      if (!firstKey.done) {
        this.cache.delete(firstKey.value);
      }
    }
  }

  get(key) {
    const entry = this.cache.get(key);

    if (entry !== null) {
      if (Date.now() > entry.timestamp + this.ttl) {
        this.cache.delete(key);
        return null;
      }

      this.cache.delete(key);
      this.cache.set(key, entry);
      return entry.value;
    }

    return null;
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    this.cache.delete(key);
  }

  size() {
    return this.cache.size;
  }

  capacity() {
    return this.capacity - this.cache.size;
  }

  clear() {
    this.cache.clear();
  }
}

const createCometLruCache = (capacity, ttl = Number.MAX_SAFE_INTEGER) => {
  return new CometLruCache(capacity, ttl);
};

export { createCometLruCache as default };
