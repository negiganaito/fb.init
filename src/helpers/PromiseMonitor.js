/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import Env from "./Env";
import FBLogger from "./FBLogger";
import { getDisplayName } from "./PromiseAnnotate";

const MAX_PROMISES = 100000;
const promiseSet = new Set();
let warningShown = false;

const monitor = (promise) => {
  if (Env.gk_comet_promise_monitor !== true) return;
  if (typeof WeakRef === "undefined") return;

  if (promiseSet.size >= MAX_PROMISES && !warningShown) {
    FBLogger.FBLogger("PromiseMonitor").warn(
      "Exceed %s promises.",
      MAX_PROMISES
    );
    warningShown = true;
    return;
  }

  // eslint-disable-next-line no-undef
  const weakRef = new WeakRef(promise);
  const entry = { thenable: weakRef };

  const cleanup = () => {
    promiseSet.delete(entry);
  };

  promise.then(cleanup, cleanup);
  promiseSet.add(entry);
};

const dump = () => {
  if (Env.gk_comet_promise_monitor !== true) return { disabled: true };

  const maxEntries = 10;
  const pendingPromises = Array.from(promiseSet)
    .slice(-maxEntries)
    .map((entry) => {
      if (entry.retainedDescription !== null) return entry.retainedDescription;

      const promise = entry.thenable.deref();
      return promise === null
        ? "Promise was GCed but not completed"
        : getDisplayName(promise) || "Promise not annotated";
    });

  return {
    seenTooManyPromises: warningShown,
    pendingPromisesTruncated: promiseSet.size > maxEntries,
    pendingPromises,
  };
};

const getUnresolvedPromiseCount = () => promiseSet.size;

export { dump, getUnresolvedPromiseCount, monitor };
