/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import MessengerWebUXLoggerImpl from "./MessengerWebUXLoggerImpl";

function useImpressionLogger() {}
function useImpressionLoggerRef(a, b) {}
function useInteractionLogger() {}
function useLogOnPressInteraction() {
  return function (a, b) {
    return a;
  };
}

const MessengerWebUXLogger =
  MessengerWebUXLoggerImpl !== null
    ? MessengerWebUXLoggerImpl
    : {
        useImpressionLogger,
        useImpressionLoggerRef,
        useInteractionLogger,
        useLogOnPressInteraction,
      };

export default MessengerWebUXLogger;
