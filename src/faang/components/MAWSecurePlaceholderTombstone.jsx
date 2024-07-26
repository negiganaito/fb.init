/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { recoverableViolation } from "path-to-recoverableViolation";
import { fromTableAscending } from "path-to-ReQL";
import { useFirst } from "path-to-ReQLSuspense";

import useReStore from "../../hooks/useReStore";

import MAWUnavailablePlaceholder from "./MAWUnavailablePlaceholder";
import MAWUnavailableStoryPlaceholder from "./MAWUnavailableStoryPlaceholder";

function useAttachment(threadKey, messageId) {
  const store = useReStore();
  return useFirst(
    () =>
      fromTableAscending(store.tables.attachments).getKeyRange(
        threadKey,
        messageId
      ),
    [store, threadKey, messageId],
    `${__filename}:25`
  );
}

const MAWSecurePlaceholderTombstone = ({ isOutgoing, message }) => {
  const attachment = useAttachment(message.threadKey, message.messageId);

  if (attachment === null) return null;

  const { defaultCtaType } = attachment;

  if (defaultCtaType === "xma_montage_share") {
    return <MAWUnavailableStoryPlaceholder isOutgoing={isOutgoing} />;
  }

  recoverableViolation(
    "Unexpected case where message is tombstone type but the attachment is not xma montage share",
    "messenger_web_sharing"
  );

  return <MAWUnavailablePlaceholder isOutgoing={isOutgoing} />;
};

MAWSecurePlaceholderTombstone.displayName = `${MAWSecurePlaceholderTombstone.name}`;

export default MAWSecurePlaceholderTombstone;
