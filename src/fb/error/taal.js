/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { TAALOpcode } from "./taal-opcode";

export const TAAL = {
  blameToPreviousFile: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
    return error;
  },
  blameToPreviousFrame: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return error;
  },
  blameToPreviousDirectory: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
    return error;
  },
};
