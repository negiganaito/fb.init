/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { TAALOpcode } from "./taal-opcode";

// Utility function to create a new error with formatted message
export function err(message, ...params) {
  let error = new Error(message);
  if (!error.stack) {
    try {
      throw error;
    } catch (e) {}
  }
  error.messageFormat = message;
  error.messageParams = params.map((param) => String(param));
  error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];
  return error;
}
