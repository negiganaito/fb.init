/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { isArmadilloSecure } from "../faang/components/LSMessagingThreadTypeUtil";
import { fromTableAscending } from "../faang/components/ReQL";
import { useFirst } from "../faang/components/ReQLSuspense";

function useIsSecureMessage(a, b, c) {
  let threadType;

  threadType =
    useFirst(
      () =>
        fromTableAscending(a.tables.threads, ["threadType"])
          .getKeyRange(b.threadKey)
          .map((record) => record.threadType),
      [a, b.threadKey],
      `${module.id}:36`
    ) ?? c.fallbackThreadType;

  if (threadType === null) {
    return c.fallbackIsSecure ?? false;
  }

  return isArmadilloSecure(threadType);
}

export default useIsSecureMessage;
