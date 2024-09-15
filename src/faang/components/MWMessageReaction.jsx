/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useRef, useState } from "react";
import { stylex } from "@stylexjs/stylex";
import { gkx } from "gkx";

import { to_int32 } from "../../helpers/I64";
import intlSummarizeNumber from "../../helpers/intlSummarizeNumber";
import useCometTheme from "../../hooks/useCometTheme";
import useFadeEffect from "../../hooks/useFadeEffect";

import BaseContextualLayer from "./BaseContextualLayer";
import MWChatMultiReactionsTooltip from "./MWChatMultiReactionsTooltip";
import MWChatReactionEmoji from "./MWChatReactionEmoji";
import { isHeart } from "./MWChatReactionsUtils";
import { SPACING_PER_COUNT_CHARACTER } from "./MWMultiReactConstants";
import MWXPopover from "./MWXPopover";
import MWXPressable from "./MWXPressable.react";
import MWXText from "./MWXText.react";

const cardBackground = { "--card-background": "rgba(0,0,0,0)" };

const styles = {
  animatedEmoji: {
    animationDuration: "xdz8niu",
    animationIterationCount: "x1v7wizp",
    animationName: "x4uz0a7",
    animationTimingFunction: "xjmqbfh",
    opacity: "x1hc1fzr",
    transform: "xds7yc5",
    transformOrigin: "x1jpgh95",
    $$css: !0,
  },
  emojiNum: {
    color: "xi81zsa",
    fontSize: "x1nxh6w3",
    fontWeight: "x1s688f",
    paddingStart: "x1k2j06m",
    paddingEnd: "x10ogl3i",
    textAlign: "x2b8uid",
    $$css: !0,
  },
  emojiRow: {
    alignItems: "x6s0dn4",
    backgroundColor: "x1vtvx1t",
    borderTopStartRadius: "xdxvlk3",
    borderTopEndRadius: "x1fglp",
    borderBottomEndRadius: "x1rp6h8o",
    borderBottomStartRadius: "xg6i1s1",
    display: "x78zum5",
    justifyContent: "xl56j7k",
    paddingBottom: "x10b6aqq",
    paddingEnd: "xsyo7zv",
    paddingStart: "xurb0ha",
    paddingTop: "x1yrsyyn",
    position: "relative",
    textAlign: "xp4054r",
    $$css: !0,
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
    $$css: !0,
  },
  scaleHeartEmoji: { transform: "xhqu4j4", $$css: !0 },
  selectedColor: { backgroundColor: "x1y4ma1z", $$css: !0 },
  selectedTextColor: { color: "x1f0x4kx", $$css: !0 },
  tooltipContainer: {
    borderTopStartRadius: "x1r9drvm",
    borderTopEndRadius: "x16aqbuh",
    borderBottomEndRadius: "x9rzwcf",
    borderBottomStartRadius: "xjkqk3g",
    display: "x1lliihq",
    marginBottom: "xjpr12u",
    marginTop: "xr9ek0c",
    maxWidth: "x86nfjv",
    opacity: "xg01cxk",
    paddingTop: "xz9dl7a",
    paddingEnd: "xn6708d",
    paddingBottom: "xsag5q8",
    paddingStart: "x1ye3gou",
    position: "relative",
    transitionDuration: "x1ebt8du",
    transitionProperty: "x19991ni",
    transitionTimingFunction: "x1dhq9h",
    $$css: !0,
  },
  tooltipContainerVisible: {
    opacity: "x1hc1fzr",
    transitionDuration: "xhb22t3",
    transitionTimingFunction: "xls3em1",
    $$css: !0,
  },
  tootltipBackgroundComet: {
    backgroundColor: "xj5tmjb",
    boxShadow: "xms15q0",
    $$css: !0,
  },
};

const MWMessageReaction = ({
  emoji,
  isProcessingReactions,
  isReadOnly,
  isTooltipShown,
  message,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onTooltipCTAPress,
  queueSendReactionCallback,
  reaction,
  sendReaction,
  shouldAnimate,
  threadKey,
}) => {
  const [InvertTheme, invertThemedProps] = useCometTheme("invert");
  const [, lightThemedProps] = useCometTheme("light");

  const isHeartEmoji = isHeart(emoji[0]);
  const emojiRef = useRef(null);

  const [isFaded, setIsFaded, fadeRef] = useFadeEffect(isTooltipShown);

  const [viewerIsReactor, setViewerIsReactor] = useState(
    reaction.viewerIsReactor
  );
  const [count, setCount] = useState(to_int32(reaction.count));
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      setIsAnimating(true);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        animationTimeoutRef.current = null;
        setIsAnimating(false);
      }, 600);
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (!isProcessingReactions) {
      setCount(to_int32(reaction.count));
      setViewerIsReactor(reaction.viewerIsReactor);
    }
  }, [isProcessingReactions, reaction.count, reaction.viewerIsReactor]);

  const incrementReaction = () => {
    setViewerIsReactor(true);
    setCount((prevCount) => prevCount + 1);
  };

  const decrementReaction = () => {
    setViewerIsReactor(false);
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const handleReactionPress = () => {
    viewerIsReactor ? decrementReaction() : incrementReaction();
    const emojiString = emoji.join("");
    if (count === 1 && viewerIsReactor) {
      sendReaction(emojiString, viewerIsReactor);
    } else {
      queueSendReactionCallback(emojiString, () => {
        sendReaction(emojiString, viewerIsReactor);
      });
    }
  };

  const countLength = intlSummarizeNumber(count).length;

  return (
    <div
      className={stylex(viewerIsReactor ? lightThemedProps : null)}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MWXPressable
        disabled={isReadOnly}
        onPress={handleReactionPress}
        overlayRadius="inherit"
        ref={emojiRef}
        xstyle={styles.emojiRowContainer}
      >
        <div
          className={stylex([
            styles.emojiRow,
            viewerIsReactor && styles.selectedColor,
          ])}
        >
          <div className="x6s0dn4 x14yjl9h xudhj91 x18nykt9 xww2gxu x1ypdohk x14ju556 x11i5rnm">
            <div
              className={stylex(
                shouldAnimate || isAnimating ? styles.animatedEmoji : false,
                isHeartEmoji ? styles.scaleHeartEmoji : false
              )}
            >
              <MWChatReactionEmoji emoji={emoji} size={16} testid={undefined} />
            </div>
          </div>
          <div
            className={stylex([
              styles.emojiNum,
              viewerIsReactor && styles.selectedTextColor,
            ])}
            data-testid={undefined}
            role="none"
            style={{ minWidth: countLength * SPACING_PER_COUNT_CHARACTER }}
          >
            {intlSummarizeNumber(count)}
          </div>
        </div>
      </MWXPressable>
      {!isReadOnly && isFaded && (
        <InvertTheme>
          <BaseContextualLayer
            align="middle"
            contextRef={emojiRef}
            position="above"
            ref={fadeRef}
          >
            <div style={gkx("23219") ? null : cardBackground}>
              <MWXPopover withArrow={gkx("23219")}>
                <div
                  className={stylex(
                    invertThemedProps,
                    styles.tooltipContainer,
                    gkx("23219") ? null : styles.tootltipBackgroundComet,
                    setIsFaded && styles.tooltipContainerVisible
                  )}
                  role="tooltip"
                >
                  <MWXText color="primary" type="body4">
                    <MWChatMultiReactionsTooltip
                      isProcessingReactions={isProcessingReactions}
                      messageId={message.messageId}
                      onTooltipCTAPress={() =>
                        onTooltipCTAPress(reaction.reactionFbid, emoji.join(""))
                      }
                      reactionFbid={reaction.reactionFbid}
                      threadKey={threadKey}
                    />
                  </MWXText>
                </div>
              </MWXPopover>
            </div>
          </BaseContextualLayer>
        </InvertTheme>
      )}
    </div>
  );
};

export default MWMessageReaction;
