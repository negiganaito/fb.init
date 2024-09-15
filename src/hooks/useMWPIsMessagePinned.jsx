/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useDeferredValue } from "react";
import gkx from "gkx";

import { ReQL } from "../faang/components/ReQL";
import { useFirst } from "../faang/components/ReQLSuspense";

import useReStore from "./useReStore";

function useMWPIsMessagePinned(message) {
  const reStore = useReStore();

  const isPinnedMessageV2 = !!useFirst(
    () => {
      return message !== null
        ? ReQL.fromTableAscending(
            reStore.tables.msg_pinned_messages_v2
          ).getKeyRange(message.threadKey, message.messageId)
        : ReQL.empty();
    },
    [reStore, message],
    `id:29`
  );

  const isClientWebPinnedMessage = !!useFirst(
    () => {
      return message !== null && !message.isUnsent
        ? ReQL.fromTableAscending(
            reStore.tables.client_web_pinned_messages
          ).getKeyRange(message.threadKey, message.offlineThreadingId)
        : ReQL.empty();
    },
    [reStore, message],
    `id:39`
  );

  return useDeferredValue(
    isPinnedMessageV2 || (isClientWebPinnedMessage && gkx("4552"))
  );
}

export default useMWPIsMessagePinned;
