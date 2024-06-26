/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// Global metadata array
let globalMetadata = [];

export class ErrorMetadata {
  constructor() {
    this.metadata = [].concat(globalMetadata);
  }

  addEntries(...entries) {
    this.metadata.push(...entries);
    return this;
  }

  addEntry(key, value, context) {
    this.metadata.push([key, value, context]);
    return this;
  }

  isEmpty() {
    return this.metadata.length === 0;
  }

  clearEntries() {
    this.metadata = [];
  }

  format() {
    // return this.metadata.map((entry) => entry.join(":").replace(/:/g, "_"));

    const itemList = [];

    this.metadata.forEach((meta) => {
      if (meta && meta.length) {
        const normalizedMeta = meta
          .map((m) => {
            return m ? String(m).replace(/:/g, "_") : "";
          })
          .join(":");
        itemList.push(normalizedMeta);
      }
    });

    return itemList;
  }

  getAll() {
    return this.metadata;
  }

  static addGlobalMetadata(key, value, context) {
    globalMetadata.push([key, value, context]);
  }

  static getGlobalMetadata() {
    return globalMetadata;
  }

  static unsetGlobalMetadata(key, value) {
    globalMetadata = globalMetadata.filter(
      (entry) =>
        !(Array.isArray(entry) && entry[0] === key && entry[1] === value)
    );
  }
}
