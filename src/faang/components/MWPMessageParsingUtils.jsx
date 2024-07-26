/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { gkx } from "gkx";
import { I64 } from "I64";
import { isStringNullOrEmpty } from "isStringNullOrEmpty";
import { LSBitFlag } from "LSBitFlag";
import { LSIntEnum } from "LSIntEnum";
import { LSMessageReplySourceTypeV2 } from "LSMessageReplySourceTypeV2";

const MAX_TEXT_LENGTH = 280;
const MAX_TIME_DIFF = 300000; // 5 minutes in milliseconds

function hasText(message) {
  return !isStringNullOrEmpty(message.text);
}

function isReplyToSomething(message) {
  const replySourceType = message.replySourceTypeV2;
  return (
    replySourceType !== null &&
    !I64.equal(
      replySourceType,
      LSIntEnum.ofNumber(LSMessageReplySourceTypeV2.FORWARD)
    )
  );
}

function isForwarded(message) {
  const replySourceType = message.replySourceTypeV2;
  return (
    replySourceType !== null &&
    I64.equal(
      replySourceType,
      LSIntEnum.ofNumber(LSMessageReplySourceTypeV2.FORWARD)
    )
  );
}

function isLongText(message) {
  return (message.text ?? "").length > MAX_TEXT_LENGTH;
}

const contentTypes = [128, 256, 4096, gkx("721") ? null : 4, 512].filter(
  Boolean
);

function shouldBeStandalone(message) {
  return (
    message.isAdminMessage ||
    contentTypes.some((type) =>
      LSBitFlag.has(LSIntEnum.ofNumber(type), message.displayedContentTypes)
    ) ||
    isLongText(message)
  );
}

function isInDifferentGroup(message, previousMessage) {
  if (previousMessage === undefined) return true;

  const timeDifference =
    Math.abs(
      I64.to_float(message.timestampMs) -
        I64.to_float(previousMessage.timestampMs)
    ) > MAX_TIME_DIFF;
  const isReply = isForwarded(message);
  const sameSender = I64.equal(message.senderId, previousMessage.senderId);

  if (
    previousMessage.isUnsent ||
    message.isUnsent ||
    previousMessage.isExpired ||
    message.isExpired ||
    isReplyToSomething(message) ||
    !sameSender ||
    timeDifference ||
    isReply ||
    shouldBeStandalone(message)
  ) {
    return true;
  } else {
    return shouldBeStandalone(previousMessage);
  }
}

function isStartOfGroup(message, previousMessage) {
  return (
    previousMessage === null || isInDifferentGroup(message, previousMessage)
  );
}

function isEndOfGroup(message, nextMessage) {
  return nextMessage === null || isInDifferentGroup(nextMessage, message);
}

function shouldConnectTop(message, previousMessage, direction) {
  return direction === "below"
    ? hasText(message)
      ? true
      : !isStartOfGroup(message, previousMessage)
    : false;
}

function shouldConnectBottom(message, nextMessage, direction) {
  if (direction === "below") {
    return !isEndOfGroup(message, nextMessage);
  } else if (isEndOfGroup(message, nextMessage)) {
    return false;
  } else {
    return hasText(message);
  }
}

const MessageWithAttachments = {
  shouldConnectBottom,
  shouldConnectTop,
};

export {
  hasText,
  isEndOfGroup,
  isForwarded,
  isInDifferentGroup,
  isLongText,
  isReplyToSomething,
  isStartOfGroup,
  MessageWithAttachments,
  shouldBeStandalone,
};
