/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

let count = 0;
const listeners = new Set();

let notification;

export default {
  listen(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  notifyStart() {
    if (count++ === 0) {
      notification = setTimeout(() => {
        listeners.forEach((x) => x(true /* loading is in progress */));
      }, 200 /* delay start loading notification for 200ms */);
    }
  },
  notifyStop() {
    listeners.forEach((x) => x(false /* loading is no longer in progress */));
    if (--count === 0) {
      clearTimeout(notification);
      listeners.forEach((x) => x(false /* loading is no longer in progress */));
    }
  },
};
