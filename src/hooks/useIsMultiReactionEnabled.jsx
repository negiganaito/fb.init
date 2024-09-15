/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  gkx,
  isUnjoinedCMThread,
  LSMessagingThreadTypeUtil,
  LSThreadBitOffset,
  MWCMIsAnyCMThread,
  MWLSThread,
  ReQL,
  ReQLSuspense,
  useIsChatPreviewsEnabled,
  useReStore,
} from "some-module";

let useReStoreCache;

const useIsMultiReactionEnabled = (threadKey) => {
  const reStore = (useReStoreCache || (useReStoreCache = useReStore))();
  const parentThreadKey = MWLSThread.useThread(
    threadKey,
    (thread) => thread.parentThreadKey
  );

  const communityType = ReQLSuspense.useFirst(
    () =>
      parentThreadKey
        ? ReQL.fromTableAscending(reStore.tables.community_folders).getKeyRange(
            parentThreadKey
          )
        : ReQL.empty(),
    [reStore, parentThreadKey],
    `${__filename}:29`
  );

  const isMultiReactEnabled = MWLSThread.useThread(threadKey, (thread) => {
    if (isUnjoinedCMThread.isUnjoinedCMThread(thread.threadType)) {
      return (
        useIsChatPreviewsEnabled.isChatPreviewsEnabled(
          thread,
          communityType?.communityType
        ) && gkx("26368")
      );
    }
    if (!LSThreadBitOffset.has(156, thread)) {
      return false;
    }
    if (MWCMIsAnyCMThread(thread.threadType)) {
      return gkx("26368");
    }
    if (LSMessagingThreadTypeUtil.isDiscoverableChannel(thread.threadType)) {
      return !gkx("4136");
    }
  });

  return isMultiReactEnabled !== null ? isMultiReactEnabled : false;
};

export { useIsMultiReactionEnabled };
