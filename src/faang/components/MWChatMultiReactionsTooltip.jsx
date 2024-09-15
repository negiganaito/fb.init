/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useRef, useState } from "react";
import fbt from "fbt";
import { LSClearReactionsV2DetailsAndRangeStoredProcedure } from "LSClearReactionsV2DetailsAndRangeStoredProcedure";
import { LSFactory } from "LSFactory";
import { LSIssueReactionsV2DetailsUsersListFetchStoredProcedure } from "LSIssueReactionsV2DetailsUsersListFetchStoredProcedure";
import { LSPlatformWaitForTaskCompletion } from "LSPlatformWaitForTaskCompletion";
import { promiseDone } from "promiseDone";

import { equal, to_int32, to_string } from "../../helpers/I64";
import intlSummarizeNumber from "../../helpers/intlSummarizeNumber";
import { useEffectInt64 } from "../../hooks/Int64Hooks";
import usePrevious from "../../hooks/usePrevious";
import useReStore from "../../hooks/useReStore";

import { useActor } from "./MWPActor.react";
import MWXPressable from "./MWXPressable";
import MWXText from "./MWXText.react";
import { ReQL } from "./ReQL";
import { toArray, useArray, useFirst } from "./ReQLSuspense";

const MAX_DISPLAYED_NAMES = 9;

const MWChatMultiReactionsTooltip = ({
  isProcessingReactions,
  messageId,
  onTooltipCTAPress,
  reactionFbid,
  threadKey,
}) => {
  const reStore = useReStore();
  const [isLoading, setIsLoading] = useState(true);
  const actor = useActor();

  useEffectInt64(() => {
    if (!isProcessingReactions) {
      setIsLoading(true);
      promiseDone(
        LSPlatformWaitForTaskCompletion(
          reStore,
          (store) =>
            LSIssueReactionsV2DetailsUsersListFetchStoredProcedure(
              LSFactory(store),
              {
                messageId,
                reactionFbid,
                threadId: threadKey,
              }
            ),
          "issueReactionsV2DetailsUsersListFetch"
        ).then(() => setIsLoading(false))
      );
    }
  }, [
    reStore,
    threadKey,
    messageId,
    reactionFbid,
    setIsLoading,
    isProcessingReactions,
  ]);

  const reactions = useArray(
    () =>
      ReQL.fromTableAscending(reStore.tables.reactions_v2_details)
        .getKeyRange(threadKey, messageId)
        .filter((reaction) => equal(reaction.reactionFbid, reactionFbid)),
    [reStore, threadKey, messageId, reactionFbid]
  );

  const nameMap = new Map();
  reactions.forEach((reaction) =>
    nameMap.set(to_string(reaction.reactorId), reaction.fullName)
  );

  const contextualProfiles = useFirst(
    () =>
      ReQL.fromTableAscending(reStore.tables.threads)
        .getKeyRange(threadKey)
        .map((thread) => {
          const parentThreadKey = thread.parentThreadKey;
          return toArray(
            ReQL.fromTableAscending(
              reStore.tables.contextual_profile_v1
            ).filter((profile) =>
              equal(profile.associatedEntityId, parentThreadKey)
            )
          );
        }),
    [reStore, threadKey]
  );

  let actorName = null;
  contextualProfiles?.forEach((profile) => {
    const ownerId = to_string(profile.ownerId);
    const profileName = profile.profileName;
    if (profileName === null) return;
    if (nameMap.has(ownerId)) nameMap.set(ownerId, profileName);
    if (equal(profile.ownerId, actor)) actorName = profileName;
  });

  const names = reactions
    .map((reaction) => nameMap.get(to_string(reaction.reactorId)))
    .filter(Boolean);

  const reactionData = useFirst(
    () =>
      ReQL.fromTableAscending(reStore.tables.reactions_v2).getKeyRange(
        threadKey,
        messageId,
        reactionFbid
      ),
    [reStore, threadKey, messageId, reactionFbid]
  );

  const viewerIsReactor = reactionData?.viewerIsReactor ?? false;

  const contactName = useFirst(
    () =>
      ReQL.fromTableAscending(reStore.tables.contacts)
        .getKeyRange(actor)
        .map((contact) => contact.name),
    [reStore, actor]
  );

  const viewerName = actorName ?? contactName;

  let reactionCount = reactionData !== null ? to_int32(reactionData.count) : 0;

  if (
    reactionCount === 1 &&
    viewerIsReactor &&
    names.length === 0 &&
    viewerName !== null
  ) {
    names.push(viewerName);
  } else if (
    viewerIsReactor &&
    names[0] !== null &&
    viewerName !== null &&
    names[0].toString() !== viewerName
  ) {
    names.unshift(viewerName);
  }

  const noReactionsText = fbt(
    "No reactions",
    "Text shown when there are no reactions"
  );

  const getDisplayedNames = () => {
    const displayedNames = [...names.slice(0, MAX_DISPLAYED_NAMES)];
    let shouldRefetch = false;

    if (names.length > MAX_DISPLAYED_NAMES) {
      const remainingCount = reactionCount - MAX_DISPLAYED_NAMES;
      if (remainingCount < 0) return [noReactionsText, true];
      displayedNames.push(
        fbt(
          "and {count} more",
          "Text shown when there are more reactions than displayed",
          { count: intlSummarizeNumber(remainingCount) }
        ).toString()
      );
    } else {
      shouldRefetch =
        (!isLoading || !isProcessingReactions) &&
        names.length !== reactionCount;
    }

    return displayedNames.length === 0
      ? [noReactionsText, shouldRefetch]
      : [
          displayedNames.map((name, index) => (
            <div key={String(index)}>{name}</div>
          )),
          shouldRefetch,
        ];
  };

  const [displayedNames, shouldRefetch] = getDisplayedNames();
  const prevShouldRefetch = usePrevious(shouldRefetch);
  const refetchTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (refetchTimeoutRef.current !== null) {
        window.clearTimeout(refetchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (prevShouldRefetch === shouldRefetch) return;
    if (!shouldRefetch) {
      if (refetchTimeoutRef.current !== null) {
        window.clearTimeout(refetchTimeoutRef.current);
        refetchTimeoutRef.current = null;
      }
    } else {
      if (refetchTimeoutRef.current !== null) return;
      refetchTimeoutRef.current = window.setTimeout(() => {
        refetchTimeoutRef.current = null;
        promiseDone(
          reStore.runInTransaction(
            (store) =>
              LSClearReactionsV2DetailsAndRangeStoredProcedure(
                LSFactory(store)
              ),
            "readwrite"
          )
        );
        promiseDone(
          reStore.runInTransaction(
            (store) =>
              LSIssueReactionsV2DetailsUsersListFetchStoredProcedure(
                LSFactory(store),
                {
                  messageId,
                  threadId: threadKey,
                }
              ),
            "readwrite"
          )
        );
      }, 700);
    }
  }, [
    reStore,
    shouldRefetch,
    prevShouldRefetch,
    messageId,
    reactionFbid,
    threadKey,
  ]);

  return (
    <MWXPressable
      aria-label={fbt("View reactions", "Aria label for viewing reactions")}
      onPress={onTooltipCTAPress}
      overlayDisabled
    >
      <MWXText color="tooltip" type="body4">
        {displayedNames}
      </MWXText>
    </MWXPressable>
  );
};

export default MWChatMultiReactionsTooltip;
