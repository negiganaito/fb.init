/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable max-params */

import React, { useCallback, useMemo } from "react";
import { stylex } from "@stylexjs/stylex";
import emptyFunction from "fbjs/lib/emptyFunction";
import fbt from "fbt";

import { to_string as i64ToString } from "../../helpers/I64";
import intlSummarizeNumber from "../../helpers/intlSummarizeNumber";
import { useIsReactionsV2Enabled } from "../../hooks/useIsReactionsV2Enabled";

import { makeSent } from "./MWChatMessageId";
import MWChatReactionsActionContainer from "./MWChatReactionsActionContainer";
import { isBroadcastThread } from "./MWCMThreadTypes.react";
import { SPACING_PER_COUNT_CHARACTER } from "./MWMultiReactConstants";
import { MWV2MessageReactionHooks } from "./MWV2MessageReactionHooks";
import MWXPressable from "./MWXPressable";
import MWXTooltip from "./MWXTooltip";

const styles = {
  additionalInlineButton: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    height: "xlup9mm",
    justifyContent: "xl56j7k",
    width: "x1npj6m0",
    ,
  },
  emoji: {
    alignItems: "x6s0dn4",
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    cursor: "x1ypdohk",
    lineHeight: "x14ju556",
    marginEnd: 0,
    ,
  },
  emojiNum: {
    paddingStart: "x1k2j06m",
    paddingEnd: "x10ogl3i",
    textAlign: "x2b8uid",
    ,
  },
  emojiRowContainer: {
    borderTopStartRadius: "xdxvlk3",
    borderTopEndRadius: "x1fglp",
    borderBottomEndRadius: "x1rp6h8o",
    borderBottomStartRadius: "xg6i1s1",
    marginBottom: "x12nagc",
    marginEnd: "xw3qccf",
    marginLeft: null,
    marginRight: null,
    ,
  },
  fontStyles: {
    color: "xi81zsa",
    fontSize: "x1nxh6w3",
    fontWeight: "x1s688f",
    ,
  },
};

const MWExpandReactionsButton = ({
  isMultiReactExpanded,
  isReactionReadOnly,
  isSecure,
  message,
  numOverflowEmojis,
  sendReaction,
  setIsReactionsRowAnimationInProgress,
  threadKey,
  threadType,
  toggleMultiReactExpanded,
}) => {
  const threadKeyString = i64ToString(threadKey);
  const timestampString = i64ToString(message.timestampMs);

  const messageID = useMemo(
    () => makeSent(threadKeyString, message.messageId, timestampString),
    [threadKeyString, message.messageId, timestampString]
  );

  const isBroadcast = isBroadcastThread(threadType);
  const isReactionsV2Enabled = useIsReactionsV2Enabled(threadKey);
  const selectedReactions =
    MWV2MessageReactionHooks.useSelectedReactionsV2(message);

  const handlePress = useCallback(() => {
    toggleMultiReactExpanded();
    setIsReactionsRowAnimationInProgress(true);
  }, [toggleMultiReactExpanded, setIsReactionsRowAnimationInProgress]);

  return (
    <MWChatReactionsActionContainer
      alwaysShowEmojiPicker
      closeActionsMenu={emptyFunction}
      disableCustomReactions={isReactionsV2Enabled && isBroadcast}
      hasReactionsV2={isReactionsV2Enabled}
      isBroadcastThread={isBroadcast}
      isSecure={isSecure}
      messageID={messageID}
      onVisibilityChange={emptyFunction}
      selectedReactions={selectedReactions || undefined}
      sendReaction={sendReaction}
    >
      {(containerRef, onHoverIn, onHoverOut, onPressIn, onPressOut) => {
        const ariaLabel = fbt("__JHASH__S6Ab1Epvc_N__JHASH__");
        const summarizedNumber = intlSummarizeNumber(numOverflowEmojis);
        const displayNumber = `+${summarizedNumber}`;
        const minWidth = summarizedNumber.length * SPACING_PER_COUNT_CHARACTER;

        const buttonContent = (
          <MWXPressable
            aria-label={ariaLabel}
            disabled={isReactionReadOnly}
            expanding
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            overlayRadius="inherit"
            ref={containerRef}
            role="button"
            testid={undefined}
            xstyle={styles.emojiRowContainer}
          >
            <div
              className="x6s0dn4 x1vtvx1t xdxvlk3 x1fglp x1rp6h8o xg6i1s1 x78zum5 xl56j7k x10b6aqq xsyo7zv xurb0ha x1yrsyyn relative xp4054r"
              role="none"
            >
              <div
                className={stylex(
                  isMultiReactExpanded
                    ? [
                        styles.fontStyles,
                        styles.emoji,
                        styles.additionalInlineButton,
                      ]
                    : [styles.fontStyles, styles.emojiNum]
                )}
                role="none"
                style={{ minWidth }}
              >
                {displayNumber}
              </div>
            </div>
          </MWXPressable>
        );

        return isReactionReadOnly ? (
          buttonContent
        ) : (
          <MWXTooltip align="middle" position="above" tooltip={ariaLabel}>
            {buttonContent}
          </MWXTooltip>
        );
      }}
    </MWChatReactionsActionContainer>
  );
};

MWExpandReactionsButton.displayName = `${MWExpandReactionsButton.name} [from ${module.id}]`;

export default MWExpandReactionsButton;
