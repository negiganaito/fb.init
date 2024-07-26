/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { I64 } from "I64";
import { fromTableAscending } from "ReQL";
import { useArray } from "ReQLSuspense";
import { useReStore } from "useReStore";

function useMWPGetAttachments({ messageId, threadKey }) {
  const store = useReStore();

  const attachments = useArray(
    () =>
      fromTableAscending(store.tables.attachments).getKeyRange(
        threadKey,
        messageId
      ),
    [store, messageId, threadKey],
    `:24`
  );

  return attachments.sort((a, b) =>
    I64.compare(a.attachmentIndex, b.attachmentIndex)
  );
}

export default useMWPGetAttachments;
