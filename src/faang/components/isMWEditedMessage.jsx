/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { gt, zero } from "../../helpers/I64";

function isMWEditedMessage(message) {
  const hasEditCount =
    message.editCount !== null && gt(message.editCount, zero);
  return hasEditCount && !message.isUnsent;
}

export default isMWEditedMessage;
