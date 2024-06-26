/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const guardStack = [];

// Error guard state management
export const ErrorGuardState = {
  pushGuard: function (guard) {
    guardStack.unshift(guard);
  },
  popGuard: function () {
    guardStack.shift();
  },
  inGuard: function () {
    return guardStack.length !== 0;
  },
  cloneGuardList: function () {
    return guardStack.map((guard) => guard.name);
  },
  findDeferredSource: function () {
    for (let i = 0; i < guardStack.length; i++) {
      let guard = guardStack[i];
      if (guard.deferredSource !== null) return guard.deferredSource;
    }
  },
};
