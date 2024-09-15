/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ReQL } from "../faang/components/ReQL";
import { useArray } from "../faang/components/ReQLSuspense";
import { compare } from "../helpers/I64";

import useReStore from "./useReStore";

function useMWPGetAttachments({ messageId, threadKey }) {
  const store = useReStore();

  const attachments = useArray(
    () =>
      ReQL.fromTableAscending(store.tables.attachments).getKeyRange(
        threadKey,
        messageId
      ),
    [store, messageId, threadKey],
    `:24`
  );

  return attachments.sort((a, b) =>
    compare(a.attachmentIndex, b.attachmentIndex)
  );
}

export default useMWPGetAttachments;
