/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const canUseDOM = !!(
  window !== undefined &&
  window.document &&
  window.document.createElement
);

// const isInWorker = typeof WorkerGlobalScope === "function";

const ExecutionEnvironment = {
  canUseDOM,
  canUseWorkers: typeof Worker !== "undefined",
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener /* || window.attachEvent */),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: true,
  isInBrowser: canUseDOM || /* isInWorker */ true,
};

export default ExecutionEnvironment;
export { ExecutionEnvironment };
