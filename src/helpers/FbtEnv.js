/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FbtErrorListenerWWW from "FbtErrorListenerWWW";
import FbtHooks from "FbtHooks";
import getFbtResult from "getFbtResult";
import getTranslatedInput from "getTranslatedInput";
import IntlViewerContext from "IntlViewerContext";
import justknobx from "justknobx";
import promiseDone from "promiseDone";
import requireDeferred from "requireDeferred";
import translationOverrideListener from "translationOverrideListener";

import getFbsResult from "./getFbsResult";

const FbtLogging = requireDeferred("FbtLogging").__setRef("FbtEnv");
const JHASH = "JHASH";
const hashRegex = new RegExp(`__${JHASH}__(.+?)__${JHASH}__`);
let initialized = false;

const setupOnce = () => {
  if (initialized) return;
  initialized = true;

  FbtHooks.register({
    errorListener: (error) => new FbtErrorListenerWWW(error),
    getFbsResult,
    getFbtResult: getFbtResult,
    getTranslatedInput,
    onTranslationOverride: translationOverrideListener,
    getViewerContext: () => IntlViewerContext,
    logImpression: (impression, context) =>
      promiseDone(
        FbtLogging.load().then((loggingModule) => {
          loggingModule.logImpression?.(impression);

          if (!justknobx._("2269")) {
            const inputTable = context?.inputTable;
            const tokens = context?.tokens ?? [];

            if (typeof inputTable === "string") {
              const match = inputTable.match(hashRegex);
              if (match) {
                loggingModule.logImpressionV2?.(match[1], tokens);
              }
            }
          }
        })
      ),
  });
};

export { setupOnce };
