/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

const store = {};

const justknobx = {
  getBool: function (key) {
    invariant(0, 47459);
  },
  getInt: function (key) {
    invariant(0, 47459);
  },
  _: function (key) {
    const entry = store[key];
    if (entry === null) {
      invariant(0, 47458, key);
    }
    return entry.r;
  },
  add: function (entries, stats) {
    for (const key in entries) {
      if (entries.hasOwnProperty(key)) {
        if (stats) {
          stats.entry++;
        }
        if (!store.hasOwnProperty(key)) {
          store[key] = entries[key];
        } else if (stats) {
          stats.dup_entry++;
        }
      }
    }
  },
};

export default justknobx;
