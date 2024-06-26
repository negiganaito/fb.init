/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ErrorGlobalEventHandler } from "./error-global-event-handler";
import { ErrorPoster } from "./error-poster";
import { ErrorPubSub } from "./error-pub-sub";
import { ErrorUnhandledRejectionHandler } from "./error-unhandled-rejection-handler";

function preSetup(objSetup) {
  if (objSetup === null || objSetup.ignoreOnError !== true) {
    ErrorGlobalEventHandler.setup(ErrorPubSub);
  }

  if (objSetup === null || objSetup.ignoreOnUnahndledRejection !== true) {
    ErrorUnhandledRejectionHandler.setup(ErrorPubSub);
  }
}

function setup(props, logFunc, context) {
  ErrorPubSub.addListener((nError) => {
    let e = context && context !== undefined ? context() : {};
    // Combine props and context properties
    let _props = {
      ...props,
      ...(e || {}),
    };

    ErrorPoster.postError(nError, _props, logFunc);
  });
}

export const ErrorSetup = {
  setup,
  preSetup,
};
