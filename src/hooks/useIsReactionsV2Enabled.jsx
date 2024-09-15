/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useThread } from "some-module/MWLSThread";

import {
  isOpenFnFThread,
  isSocialChannelUnjoined,
  isUnjoinedDiscoverablePublicBroadcastChannel,
} from "../faang/components/LSMessagingThreadTypeUtil";
import { has } from "../faang/components/LSThreadBitOffset";
import ReQL from "../faang/components/ReQL";
import { useFirst } from "../faang/components/ReQLSuspense";

import { useIsChatPreviewsEnabled } from "./useIsChatPreviewsEnabled";
import useReStore from "./useReStore";

const useIsReactionsV2Enabled = (threadKey) => {
  const reStore = useReStore();
  const parentThreadKey = useThread(
    threadKey,
    (thread) => thread.parentThreadKey
  );

  const communityType = useFirst(
    () =>
      parentThreadKey
        ? ReQL.fromTableAscending(reStore.tables.community_folders).getKeyRange(
            parentThreadKey
          )
        : ReQL.empty(),
    [reStore, parentThreadKey],
    `${__filename}:33`
  );

  const isReactionsEnabled = useThread(threadKey, (thread) =>
    isReactionsV2Enabled(thread, communityType?.communityType)
  );

  return isReactionsEnabled !== null ? isReactionsEnabled : false;
};

const isReactionsV2Enabled = (thread, communityType) => {
  if (isOpenFnFThread(thread)) return false;
  if (has(139, thread)) return true;

  const isChatPreviewsEnabled = useIsChatPreviewsEnabled(thread, communityType);
  return isChatPreviewsEnabled ? true : false;
};

const isReactionsV2ReadOnly = (thread, communityType) => {
  const _isUnjoinedDiscoverablePublicBroadcastChannel =
    isUnjoinedDiscoverablePublicBroadcastChannel(thread.threadType) ||
    isSocialChannelUnjoined(thread.threadType);
  const isChatPreviewsEnabled = useIsChatPreviewsEnabled(thread, communityType);

  return _isUnjoinedDiscoverablePublicBroadcastChannel || isChatPreviewsEnabled;
};

export { isReactionsV2Enabled, isReactionsV2ReadOnly, useIsReactionsV2Enabled };
