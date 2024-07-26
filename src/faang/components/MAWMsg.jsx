/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import $InternalEnum from "../../helpers/$InternalEnum";
import { equal } from "../../helpers/I64";

import { ofNumber } from "./LSIntEnum";
import MAWMsgType from "./MAWMsgType";

const MAWMsg = (() => {
  // eslint-disable-next-line max-params
  function getDisplayedContentTypes(
    type,
    isSomeCondition,
    someValue,
    anotherCondition,
    futureProofType
  ) {
    if (type === MAWMsgType.MSG_TYPE.TEXT) {
      if (isSomeCondition) return ofNumber(8192);
      else return ofNumber(1);
    } else if (
      [
        MAWMsgType.MSG_TYPE.IMAGE,
        MAWMsgType.MSG_TYPE.VIDEO,
        MAWMsgType.MSG_TYPE.RAVEN,
      ].includes(type)
    ) {
      return ofNumber(2);
    } else if (type === MAWMsgType.MSG_TYPE.PTT) {
      return ofNumber(4);
    } else if (type === MAWMsgType.MSG_TYPE.FUTUREPROOF) {
      return handleFutureProofType(futureProofType);
    } else if (type === MAWMsgType.MSG_TYPE.CIPHERTEXT) {
      return ofNumber(65536);
    } else if (type === MAWMsgType.MSG_TYPE.UNAVAILABLE) {
      return ofNumber(262144);
    } else if (type === MAWMsgType.MSG_TYPE.GIF) {
      return ofNumber(16384);
    } else if (type === MAWMsgType.MSG_TYPE.STICKER) {
      return ofNumber(4096);
    } else if (type === MAWMsgType.MSG_TYPE.DOCUMENT_FILE) {
      return ofNumber(64);
    } else if (type === MAWMsgType.MSG_TYPE.XMA) {
      if (someValue !== null && someValue) return ofNumber(256);
      else return ofNumber(1024);
    } else if (type === MAWMsgType.MSG_TYPE.BUMP_EXISTING_MESSAGE) {
      if (!anotherCondition) return ofNumber(33554432);
      else return ofNumber(1);
    } else {
      return ofNumber(1);
    }
  }

  function handleFutureProofType(futureProofType) {
    switch (futureProofType) {
      case "locationMessage":
      case "liveLocationMessage":
        return ofNumber(524288);
      case "pollCreationMessage":
        return ofNumber(1048576);
      case "contactShareMessage":
        return ofNumber(2097152);
      case "storyMentionMessage":
        return ofNumber(4194304);
      case "metaAiMessage":
        return ofNumber(8388608);
      case "bumpMessage":
        return ofNumber(16777216);
      case "stickerReceiverFetchMessage":
        return ofNumber(67108864);
      default:
        return ofNumber(131072);
    }
  }

  function isMediaMsg(msg) {
    const contentTypes = msg.displayedContentTypes;
    return [2, 4, 16384, 16, 64, 4096].some((type) =>
      equal(contentTypes, ofNumber(type))
    );
  }

  function isAdminMsg(msg) {
    const contentTypes = msg.displayedContentTypes;
    return equal(contentTypes, ofNumber(32));
  }

  function isXMAMsg(msg) {
    const contentTypes = msg.displayedContentTypes;
    return equal(contentTypes, ofNumber(1024));
  }

  function isPlaceholder(msg) {
    const contentTypes = msg.displayedContentTypes;
    return [
      65536, 131072, 524288, 1048576, 2097152, 4194304, 8388608, 16777216,
      262144,
    ].some((type) => equal(contentTypes, ofNumber(type)));
  }

  const MAWRavenActionNotifType = $InternalEnum({
    PLAYED: 0,
    SCREENSHOTTED: 1,
    FORCE_DISABLED: 2,
  });
  const MAWRavenMsgEphemeralMediaState = $InternalEnum({
    PERMANENT: 0,
    UNSEEN: 1,
    SEEN: 2,
    REPLAYED: 3,
    EXPIRED: 4,
  });
  const MAWRavenMsgEphemeralType = $InternalEnum({
    VIEW_ONCE: 0,
    ALLOW_REPLAY: 1,
    KEEP_IN_CHAT: 2,
  });

  return {
    text: MAWMsgType.MSG_TYPE.TEXT,
    image: MAWMsgType.MSG_TYPE.IMAGE,
    video: MAWMsgType.MSG_TYPE.VIDEO,
    ptt: MAWMsgType.MSG_TYPE.PTT,
    unsent: MAWMsgType.MSG_TYPE.REVOKED,
    gif: MAWMsgType.MSG_TYPE.GIF,
    bumpExistingMessage: MAWMsgType.MSG_TYPE.BUMP_EXISTING_MESSAGE,
    getDisplayedContentTypes,
    isMediaMsg,
    isAdminMsg,
    isXMAMsg,
    isPlaceholder,
    MAWRavenActionNotifType,
    MAWRavenMsgEphemeralMediaState,
    MAWRavenMsgEphemeralType,
  };
})();

export default MAWMsg;
