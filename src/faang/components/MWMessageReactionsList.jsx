/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useRef } from "react";
import { stylex } from "@stylexjs/stylex";

import { equal, to_int32 } from "../../helpers/I64";
import intlSummarizeNumber from "../../helpers/intlSummarizeNumber";
import useEmojiReactionDynamicStyleXTransition from "../../hooks/useEmojiReactionDynamicStyleXTransition";
import useSendReactionCallbackQueue from "../../hooks/useSendReactionCallbackQueue";

import LSAuthorityLevel from "./LSAuthorityLevel";
import { ofNumber } from "./LSIntEnum";
import MWMessageReaction from "./MWMessageReaction";
import { REACTIONS_ROW_EXPAND_COLLAPSE_ANIMATION_TOTAL_DURATION } from "./MWMultiReactConstants";

const MWMessageReactionsList = ({
  emojis,
  hideTooltip,
  isMultiReactExpanded,
  isReactionReadOnly,
  message,
  onTooltipCTAPress,
  previousReactionItems,
  reactionItemsShown,
  reactionsV2,
  sendReactionThrottled,
  setIsReactionsRowAnimationInProgress,
  setShouldAnimate,
  shouldAnimate,
  showTooltip,
  threadKey,
  tooltipIndex,
}) => {
  const reactionCount = reactionItemsShown.length;
  const reactionCountRef = useRef(reactionCount);
  const [sendReactionCallback, sendReactionCallbackQueue] =
    useSendReactionCallbackQueue();

  const handleEnterComplete = () => {
    reactionCountRef.current = reactionCount;
    setIsReactionsRowAnimationInProgress(false);
    if (isMultiReactExpanded) setShouldAnimate(false);
  };

  const handleLeaveComplete = () => {
    reactionCountRef.current = reactionCount;
    setIsReactionsRowAnimationInProgress(false);
  };

  let reactionElements = [];
  if (reactionsV2 !== null) {
    reactionElements = reactionItemsShown.map((item, index) => {
      const emoji = item.emoji;
      const reaction = item.reaction;
      return emojis[index] === null
        ? null
        : {
            element: (
              <MWMessageReaction
                emoji={emoji}
                isProcessingReactions={sendReactionCallbackQueue}
                isReadOnly={isReactionReadOnly}
                isTooltipShown={tooltipIndex === index}
                message={message}
                onFocus={() => showTooltip(index)}
                onMouseEnter={() => showTooltip(index)}
                onMouseLeave={hideTooltip}
                onTooltipCTAPress={onTooltipCTAPress}
                queueSendReactionCallback={sendReactionCallback}
                reaction={reaction}
                sendReaction={sendReactionThrottled}
                shouldAnimate={
                  previousReactionItems?.find(
                    (item) => item.emoji.join("") === emoji.join("")
                  ) === null &&
                  equal(
                    reaction.authorityLevel,
                    ofNumber(LSAuthorityLevel.OPTIMISTIC)
                  )
                }
                threadKey={threadKey}
              />
            ),
            key: emojis.toString() + index,
            reactionCountCharactersNum: intlSummarizeNumber(
              to_int32(reaction.count)
            ).length,
          };
    });
  }

  const transitions = useEmojiReactionDynamicStyleXTransition(
    reactionElements,
    (item) => item?.key || 0,
    {
      duration: REACTIONS_ROW_EXPAND_COLLAPSE_ANIMATION_TOTAL_DURATION,
      onEnterComplete: handleEnterComplete,
      onLeaveComplete: handleLeaveComplete,
    }
  );

  return shouldAnimate
    ? transitions.map(({ xstyle, style, item }) => (
        <div className={stylex([xstyle])} style={{ ...style }} key={item?.key}>
          {item?.element}
        </div>
      ))
    : reactionElements.map((item) => item?.element);
};

MWMessageReactionsList.displayName = `${MWMessageReactionsList.name}`;
export default MWMessageReactionsList;
