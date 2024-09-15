/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { MWCMisStandAloneCommunity } from "MWCMisStandAloneCommunity";
import { MWLSThread } from "MWLSThread";

import { ReQL } from "../faang/components/ReQL";
import { useFirst } from "../faang/components/ReQLSuspense";
import { isUnjoinedCMThread } from "../helpers/isUnjoinedCMThread";

import useReStore from "./useReStore";

const useIsChatPreviewsEnabled = (threadKey) => {
  const store = useReStore();

  const parentThreadKey = MWLSThread.useThread(
    threadKey,
    (thread) => thread.parentThreadKey
  );

  const communityFolder = useFirst(
    () => {
      return parentThreadKey
        ? ReQL.fromTableAscending(store.tables.community_folders).getKeyRange(
            parentThreadKey
          )
        : ReQL.empty();
    },
    [store, parentThreadKey],
    `${threadKey}:27`
  );

  const thread = MWLSThread.useThread(threadKey, (thread) =>
    isChatPreviewsEnabled(thread, communityFolder?.communityType)
  );

  return thread !== null ? thread : false;
};

const isChatPreviewsEnabled = (thread, communityType) => {
  if (thread.needsAdminApprovalForNewParticipant === true) return false;
  return !isUnjoinedCMThread(thread.threadType)
    ? false
    : MWCMisStandAloneCommunity(communityType);
};

export { isChatPreviewsEnabled, useIsChatPreviewsEnabled };
