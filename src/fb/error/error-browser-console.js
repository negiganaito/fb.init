/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// Flag to track if an error has been logged
let hasLoggedError = false;

// Error listener to log errors to console
export const ErrorBrowserConsole = {
  errorListener: (errorEvent) => {
    const { console } = window;
    const logType = console[errorEvent.type] ? errorEvent.type : "error";
    if (
      errorEvent.type === "fatal" ||
      (logType === "error" && !hasLoggedError)
    ) {
      console.error(
        "ErrorUtils caught an error:\n\n" +
          errorEvent.message +
          "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs."
      );
      hasLoggedError = true;
    }
  },
};
