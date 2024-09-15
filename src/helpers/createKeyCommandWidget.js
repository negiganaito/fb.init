/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext, useContext, useEffect } from "react";
import recoverableViolation from "recoverableViolation";

import createKeyCommandWrapper from "./createKeyCommandWrapper";

function createKeyCommandWidget(debug = true) {
  const KeyCommandContext = createContext();
  const KeyCommandWrapper = createKeyCommandWrapper(debug, KeyCommandContext);

  function useKeyCommands(commands, throwError = false, options) {
    const context = useContext(KeyCommandContext);

    useEffect(() => {
      if (!context) {
        if (!throwError) {
          recoverableViolation(
            "Attempting to register a key command outside of its widget scope. Calls to useKeyCommand must be within its widget's wrapper.",
            "comet_ax"
          );
        }
        return;
      }
      if (commands) {
        return context.addCommands(commands, options);
      }
    }, [context, commands, throwError, options]);
  }

  return {
    Context: KeyCommandContext,
    Wrapper: KeyCommandWrapper,
    useKeyCommands,
  };
}

export default createKeyCommandWidget;
