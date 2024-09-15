/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import gkx from "gkx";

import { ofNumber } from "../faang/components/LSIntEnum";
import { MessagingAttachmentType } from "../faang/components/MessagingAttachmentType";
import { equal } from "../helpers/I64";
import isStringNullOrEmpty from "../helpers/isStringNullOrEmpty";

import useIsRollcallEnabled from "./useIsRollcallEnabled";

const ATTACHMENT_TYPES_THAT_ALLOW_PROMPTS = [
  MessagingAttachmentType.IMAGE,
  MessagingAttachmentType.VIDEO,
];

const useShouldAllowRollCallForMessage = (message, attachments) => {
  const isRollcallEnabled = useIsRollcallEnabled(message.threadKey);

  if (!isRollcallEnabled) {
    return false;
  }

  if (gkx("23420") && !isStringNullOrEmpty(message.text)) {
    return true;
  }

  return attachments.some((attachment) => {
    const attachmentType =
      attachment.attachmentType !== null
        ? attachment.attachmentType
        : ofNumber(MessagingAttachmentType.NONE);

    return ATTACHMENT_TYPES_THAT_ALLOW_PROMPTS.some((type) =>
      equal(attachmentType, ofNumber(type))
    );
  });
};

export {
  ATTACHMENT_TYPES_THAT_ALLOW_PROMPTS,
  useShouldAllowRollCallForMessage,
};
