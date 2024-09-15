/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";

import ErrorPubSub from "./ErrorPubSub";
import getErrorSafe from "./getErrorSafe";
import { getDisplayName, setDisplayName } from "./PromiseAnnotate";
import { monitor } from "./PromiseMonitor";

const promiseDone = (promise, onFulfilled, onRejected) => {
  const result =
    // eslint-disable-next-line no-undef
    arguments.length > 1 ? promise.then(onFulfilled, onRejected) : promise;

  result.then(emptyFunction, (error) => {
    error = getErrorSafe(error);
    error.loggingSource = "PROMISE_DONE";
    ErrorPubSub.reportError(error);
  });

  const displayName = getDisplayName(promise);
  if (displayName !== null) {
    setDisplayName(result, displayName);
  }

  monitor(result);
};

export default promiseDone;
