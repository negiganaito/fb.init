/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import * as WAMsgType from "./WAMsgType";

const MAWMsgType = (() => {
  const isMAWSupportedMediaType = (type) => mawSupportedMediaTypes.has(type);
  const isEBSupportedMsgType = (type) =>
    ebSupportedMsgTypes.has(type) || mawSupportedMediaTypes.has(type);

  const EPHEMERAL_SCREENSHOT_ACTION = "EphemeralScreenshotAction";
  const RAVEN = "Raven";
  const RAVEN_ACTION = "RavenAction";
  const XMA = "XMA";
  const BUMP_EXISTING_MESSAGE = "BumpExistingMessage";

  const MSG_TYPE = {
    ...WAMsgType.MSG_TYPE,
    BUMP_EXISTING_MESSAGE,
    EPHEMERAL_SCREENSHOT_ACTION,
    RAVEN,
    RAVEN_ACTION,
    XMA,
  };

  const mawSupportedMediaTypes = new Set([
    MSG_TYPE.IMAGE,
    MSG_TYPE.VIDEO,
    MSG_TYPE.PTT,
    MSG_TYPE.GIF,
    MSG_TYPE.STICKER,
    MSG_TYPE.XMA,
    MSG_TYPE.RAVEN,
    MSG_TYPE.DOCUMENT_FILE,
  ]);

  const ebSupportedMsgTypes = new Set([
    MSG_TYPE.TEXT,
    MSG_TYPE.REVOKED,
    MSG_TYPE.XMA,
    MSG_TYPE.BUMP_EXISTING_MESSAGE,
  ]);

  const quotedMsgTypes = new Set([
    MSG_TYPE.TEXT,
    MSG_TYPE.IMAGE,
    MSG_TYPE.VIDEO,
    MSG_TYPE.PTT,
    MSG_TYPE.GIF,
    MSG_TYPE.STICKER,
    MSG_TYPE.DOCUMENT_FILE,
    MSG_TYPE.UNAVAILABLE,
    MSG_TYPE.EXPIRED_EPHEMERAL,
    MSG_TYPE.REVOKED,
    MSG_TYPE.XMA,
  ]);

  const isQuotedMsgType = (type) => quotedMsgTypes.has(type);

  return {
    isMAWSupportedMediaType,
    isEBSupportedMsgType,
    EPHEMERAL_SCREENSHOT_ACTION,
    MSG_TYPE,
    mawSupportedMediaTypes,
    isQuotedMsgType,
  };
})();

export default MAWMsgType;
