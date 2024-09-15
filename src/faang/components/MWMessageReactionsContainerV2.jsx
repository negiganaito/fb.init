/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useRef, useState } from "react";
import stylex from "@stylexjs/stylex";
import emptyFunction from "fbjs/lib/emptyFunction";
import { useThread } from "MWLSThread";

import { ReQL } from "../../faang/components/ReQL";
import justknobx from "../../helpers/justknobx";
import unrecoverableViolation from "../../helpers/unrecoverableViolation";
import useGetMultiReactOrderedItems from "../../hooks/useGetMultiReactOrderedItems";
import { useIsMultiReactionEnabled } from "../../hooks/useIsMultiReactionEnabled";
import { useIsReactionsV2Enabled } from "../../hooks/useIsReactionsV2Enabled";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import usePrevious from "../../hooks/usePrevious";
import useReStore from "../../hooks/useReStore";
import useThrottled from "../../hooks/useThrottled";

import {
  isArmadilloSecure,
  isDiscoverableChannel,
} from "./LSMessagingThreadTypeUtil";
import { useSendOrRemoveReaction } from "./MAWPSendOrRemoveReaction";
import MWAddReactionButton from "./MWAddReactionButton";
import MWExpandReactionsButton from "./MWExpandReactionsButton";
import MWMessageReactionsList from "./MWMessageReactionsList";
import {
  CM_MAX_REACTION_EMOJIS_ALLOWED,
  DEFAULT_MAX_REACTION_PREVIEWED_ALLOWED,
  PUBLIC_CHANNELS_MAX_REACTIONS_EMOJIS_PREVIEWED_WHEN_COLLAPSED,
} from "./MWMultiReactConstants";
import { useFirst } from "./ReQLSuspense";

const styles = {
  wrapper: {
    alignItems: "x1cy8zhl",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    flexWrap: "x1a02dak",
    marginTop: "x1gslohp",
    ,
  },
  wrapperOutgoing: {
    alignItems: "xuk3077",
    justifyContent: "x13a6bvl",
    ,
  },
};

const MWMessageReactionsContainerV2 = ({
  emojis,
  isMultiReactRowExpanded,
  message,
  onOpenDialog,
  outgoing,
  reactionsV2,
  toggleMultiReactionRowExpansion,
}) => {
  const [tooltipIndex, setTooltipIndex] = useState(-1);
  const [animationState, setAnimationState] = useState({
    isReactionsRowAnimationInProgress: false,
    shouldAnimate: justknobx._("2078"),
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const reactionTimer = useRef(null);
  const store = useReStore();
  const thread = useThread(message.threadKey);
  const parentThreadKey = thread?.parentThreadKey;
  const parentThread = useFirst(
    () =>
      parentThreadKey
        ? ReQL.fromTableAscending(store.tables.community_folders).getKeyRange(
            parentThreadKey
          )
        : ReQL.empty(),
    [store, parentThreadKey],
    `${message.id}:99`
  );

  if (!thread?.threadType) {
    throw unrecoverableViolation(
      "thread cannot be null when reacting to message",
      "messenger_web_messaging"
    );
  }

  const isSecure = isArmadilloSecure(thread.threadType);
  const isPublicChannel = isDiscoverableChannel(thread.threadType);
  const onOutsideClick = useOnOutsideClick(
    isMultiReactRowExpanded
      ? () => {
          if (!isExpanded) {
            setAnimationState((prev) => ({ ...prev, shouldAnimate: true }));
            toggleMultiReactionRowExpansion &&
              toggleMultiReactionRowExpansion();
            setAnimationState((prev) => ({
              ...prev,
              isReactionsRowAnimationInProgress: true,
            }));
          }
        }
      : null
  );

  const isMultiReactEnabled = useIsMultiReactionEnabled(message.threadKey);
  const sendOrRemoveReaction = useSendOrRemoveReaction(
    message,
    isSecure,
    "instant_react"
  );

  const handleSendOrRemoveReaction = useCallback(
    (emoji, isRemove) =>
      sendOrRemoveReaction(
        message.messageId,
        emoji,
        isRemove ? "remove_reaction" : "reaction"
      ),
    [sendOrRemoveReaction, message.messageId]
  );

  const throttledSendOrRemoveReaction = useThrottled(
    handleSendOrRemoveReaction,
    750
  );

  const handleShowTooltip = useCallback(
    (index) => {
      if (tooltipIndex === index) return;
      setIsExpanded(true);
      if (reactionTimer.current !== null) clearTimeout(reactionTimer.current);
      setTooltipIndex(-1);
      reactionTimer.current = setTimeout(() => setTooltipIndex(index), 1500);
    },
    [tooltipIndex]
  );

  const handleHideTooltip = useCallback(() => {
    setIsExpanded(false);
    if (reactionTimer.current !== null) clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => setTooltipIndex(-1), 300);
  }, []);

  const handleOpenDialog = useCallback(
    (reactionFbid, reactionType) => {
      onOpenDialog({ reactionFbid, reactionType });
      handleHideTooltip();
    },
    [handleHideTooltip, onOpenDialog]
  );

  const multiReactOrderedItems = useGetMultiReactOrderedItems(
    emojis,
    reactionsV2
  );

  const maxEmojisPreviewed = isMultiReactEnabled
    ? isPublicChannel
      ? PUBLIC_CHANNELS_MAX_REACTIONS_EMOJIS_PREVIEWED_WHEN_COLLAPSED
      : CM_MAX_REACTION_EMOJIS_ALLOWED
    : DEFAULT_MAX_REACTION_PREVIEWED_ALLOWED;

  const emojisToShow = isMultiReactRowExpanded
    ? multiReactOrderedItems
    : multiReactOrderedItems.slice(0, maxEmojisPreviewed);

  const overflowEmojis = isMultiReactRowExpanded
    ? []
    : multiReactOrderedItems.slice(maxEmojisPreviewed);
  const overflowEmojisCount = overflowEmojis.length;

  const isReactionsV2ReadOnly = useIsReactionsV2Enabled(
    thread,
    parentThread?.communityType
  )?.isReactionsV2ReadOnly;
  const shouldShowExpandButton =
    !outgoing && animationState.isReactionsRowAnimationInProgress;
  const canAddReaction =
    !isReactionsV2ReadOnly &&
    emojisToShow.length > 0 &&
    (isPublicChannel || emojisToShow.length < CM_MAX_REACTION_EMOJIS_ALLOWED) &&
    !shouldShowExpandButton;
  const showExpandButton = overflowEmojisCount > 0 && !shouldShowExpandButton;

  if (emojisToShow.length < 1) return null;

  return (
    <div
      className={stylex(styles.wrapper, outgoing && styles.wrapperOutgoing)}
      data-testid={undefined}
      ref={onOutsideClick}
    >
      <MWMessageReactionsList
        emojis={emojis}
        hideTooltip={handleHideTooltip}
        isMultiReactExpanded={isMultiReactRowExpanded}
        isReactionReadOnly={isReactionsV2ReadOnly}
        message={message}
        onTooltipCTAPress={handleOpenDialog}
        previousReactionItems={usePrevious(multiReactOrderedItems)}
        reactionItemsShown={emojisToShow}
        reactionsV2={reactionsV2}
        sendReactionThrottled={throttledSendOrRemoveReaction}
        setIsReactionsRowAnimationInProgress={(value) =>
          setAnimationState((prev) => ({
            ...prev,
            isReactionsRowAnimationInProgress: value,
          }))
        }
        setShouldAnimate={(value) =>
          setAnimationState((prev) => ({ ...prev, shouldAnimate: value }))
        }
        shouldAnimate={animationState.shouldAnimate}
        showTooltip={handleShowTooltip}
        threadKey={message.threadKey}
        tooltipIndex={tooltipIndex}
      />
      {showExpandButton && (
        <MWExpandReactionsButton
          isMultiReactExpanded={isMultiReactRowExpanded}
          isReactionReadOnly={isReactionsV2ReadOnly}
          isSecure={isSecure}
          message={message}
          numOverflowEmojis={overflowEmojisCount}
          sendReaction={handleSendOrRemoveReaction}
          setIsReactionsRowAnimationInProgress={(value) =>
            setAnimationState((prev) => ({
              ...prev,
              isReactionsRowAnimationInProgress: value,
            }))
          }
          threadKey={message.threadKey}
          threadType={thread.threadType}
          toggleMultiReactExpanded={
            toggleMultiReactionRowExpansion || emptyFunction
          }
        />
      )}
      {canAddReaction && (
        <MWAddReactionButton
          isSecure={isSecure}
          message={message}
          sendReaction={(emoji, isRemove) => {
            if (overflowEmojisCount > 0) {
              toggleMultiReactionRowExpansion?.();
            }
            setTimeout(
              () => handleSendOrRemoveReaction(emoji, isRemove),
              overflowEmojisCount * 10
            );
          }}
          setShouldRowStayExpanded={setIsExpanded}
          threadKey={message.threadKey}
          threadType={thread.threadType}
        />
      )}
    </div>
  );
};

MWMessageReactionsContainerV2.displayName = `MWMessageReactionsContainerV2`;
export default MWMessageReactionsContainerV2;
