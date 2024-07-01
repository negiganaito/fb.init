/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ErrorMetadata } from "./error-metadata";
import { FBLogMessage } from "./fb-log-message";

export function FBLogger(projectName, occurAt) {
  const fbLogMessage = new FBLogMessage(projectName);
  return occurAt
    ? fbLogMessage.event(projectName + "." + occurAt)
    : fbLogMessage;
}

FBLogger.addGlobalMetadata = function (a, b, c) {
  ErrorMetadata.addGlobalMetadata(a, b, c);
};
