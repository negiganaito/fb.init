/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { err } from "./err";
import { getErrorSafe } from "./get-error-safe";

const onError =
  typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>";

let errorPubSub = null;

function listener(errEvent) {
  const newError = errEvent.error
    ? getErrorSafe(errEvent.error)
    : err(errEvent.message || "");

  if (!newError.fileName && errEvent.filename)
    newError.fileName = errEvent.filename;

  if (!newError.line && errEvent.lineno) newError.line = errEvent.lineno;

  if (!newError.column && errEvent.colno) newError.column = errEvent.colno;

  newError.guardList = [onError];
  newError.loggingSource = "ONERROR";

  errorPubSub || errorPubSub === undefined
    ? undefined
    : errorPubSub.reportError(newError);
}

export const ErrorGlobalEventHandler = {
  setup: function (ePubSub) {
    if (typeof window.addEventListener !== "function") return;
    if (errorPubSub) return;
    errorPubSub = ePubSub;
    window.addEventListener("error", (e) => listener(e));
  },
};
