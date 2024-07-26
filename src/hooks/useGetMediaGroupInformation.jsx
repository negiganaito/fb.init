/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { qex } from "qex";
import { ReQL, ReQLSuspense } from "ReQL";
import { useReStore } from "useReStore";

import { to_int32, zero } from "../business/helpers/I64";

const useGetMediaGroupInformation = (params, flag) => {
  const store = useReStore();
  const { groupId, threadKey, groupIndex, groupSize } = params;

  const groupIdx = to_int32(groupIndex !== null ? groupIndex : zero);
  const size = to_int32(groupSize !== null ? groupSize : zero);

  const shouldFetchMediaGroup =
    flag &&
    qex._("1113") === true &&
    groupId !== null &&
    groupIndex !== null &&
    groupSize !== null &&
    size > 1;

  let tileSize = shouldFetchMediaGroup ? 4 : 0;
  if (shouldFetchMediaGroup && size < 4) tileSize = size;

  const messagesAndAttachments = ReQLSuspense.useArray(
    () => {
      return shouldFetchMediaGroup && groupId !== null
        ? ReQL.fromTableDescending(
            store.tables.messages.index("messageGroupId")
          )
            .getKeyRange(groupId)
            .map((message) => {
              const attachment =
                ReQLSuspense.first(
                  ReQL.fromTableDescending(
                    store.tables.attachments
                  ).getKeyRange(threadKey, message.messageId),
                  `id:75`
                ) || null;

              return { attachment, message };
            })
        : ReQL.empty();
    },
    [store, groupId, threadKey, shouldFetchMediaGroup],
    `id:67`
  ).sort(
    (a, b) =>
      to_int32(a.message.groupIndex ?? zero) -
      to_int32(b.message.groupIndex ?? zero)
  );

  const firstMessage =
    shouldFetchMediaGroup && messagesAndAttachments.length >= 1
      ? messagesAndAttachments[0]?.message
      : null;

  const isMediaGroupLastMessage = ReQLSuspense.useFirst(
    () => {
      return shouldFetchMediaGroup && firstMessage !== null
        ? ReQL.fromTableAscending(
            store.tables.messages.index("messageDisplayOrder"),
            ["isAdminMessage", "timestampMs", "senderId", "groupId"]
          )
            .getKeyRange(firstMessage.threadKey)
            .bounds({ gte: ReQL.key(firstMessage.primarySortKey) })
            .filter((msg) => msg.groupId !== firstMessage.groupId)
            .filter((msg) => !msg.isAdminMessage)
        : ReQL.empty();
    },
    [store, firstMessage, shouldFetchMediaGroup],
    `id:98`
  );

  if (shouldFetchMediaGroup !== true) return null;

  const firstIndex =
    messagesAndAttachments.length >= 1
      ? to_int32(messagesAndAttachments[0]?.message?.groupIndex ?? zero)
      : 0;

  const isFirstMediaMessageInGroup = groupIdx === firstIndex;

  const messagesAndAttachmentsShownInGroup = Array.from(
    { length: tileSize },
    (_, idx) => {
      const foundIndex = messagesAndAttachments.findIndex(
        (msg) =>
          msg.message.groupIndex !== null &&
          to_int32(msg.message.groupIndex) === idx
      );

      return foundIndex === -1
        ? { attachment: null, message: null }
        : messagesAndAttachments[foundIndex];
    }
  );

  return {
    groupId,
    groupIndex: groupIdx,
    groupSize: size,
    hasMissingMedia: messagesAndAttachments.some(
      (msg) => msg.attachment === null
    ),
    hasMissingMessages: messagesAndAttachments.length !== size,
    isFirstMediaMessageInGroup,
    isMediaGroupLastMessage: isMediaGroupLastMessage === null,
    messagesAndAttachments,
    messagesAndAttachmentsShownInGroup,
    tileSize,
  };
};

export default useGetMediaGroupInformation;
