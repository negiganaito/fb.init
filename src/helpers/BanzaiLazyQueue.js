/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { SimpleHook } from "./SimpleHook";

const queue = [];
const queueHook = new SimpleHook();

const BanzaiLazyQueue = {
  onQueue: queueHook,

  queuePost: (a, b, c) => {
    queue.push([a, b, c]);
    queueHook.call(a, b, c);
  },

  flushQueue: () => {
    const currentQueue = queue;
    queue.length = 0;
    return currentQueue;
  },
};

export default BanzaiLazyQueue;
