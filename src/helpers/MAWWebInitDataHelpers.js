/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import err from "err";
import gkx from "gkx";

import { MessengerWebInitData } from "./MessengerWebInitData";

function getLastAccountKeyFormatVersion() {
  return gkx("3992") ? 2 : 1;
}

function getAccountKeyString(formatVersion) {
  switch (formatVersion) {
    case 2:
      return MessengerWebInitData.accountKeyV2;
    case 1:
      return MessengerWebInitData.accountKey;
    default:
      throw err("Invalid format version, should never happen.");
  }
}

export { getAccountKeyString, getLastAccountKeyFormatVersion };
