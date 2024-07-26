/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { empty, fromTableAscending } from "ReQL";
import { useFirst } from "ReQLSuspense";
import { useReStore } from "useReStore";

const ITEMS_TO_TAKE = 10;

function useNextNonAdminMessage(params, fallback) {
  const store = useReStore();
  const isAdminMessage = fallback?.isAdminMessage === true;

  const query = useFirst(
    () => {
      if (isAdminMessage) {
        return fromTableAscending(
          store.tables.messages.index("messageDisplayOrder"),
          ["isAdminMessage", "timestampMs", "senderId"]
        )
          .getKeyRange(params.threadKey)
          .bounds({ gt: fromTableAscending.key(params.primarySortKey) })
          .take(ITEMS_TO_TAKE)
          .filter((message) => !message.isAdminMessage);
      } else {
        return empty();
      }
    },
    [store, isAdminMessage, params.primarySortKey, params.threadKey],
    `${fallback.id}:49`
  );

  return isAdminMessage ? query : fallback;
}

export default useNextNonAdminMessage;
