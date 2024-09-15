/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useCallback, useMemo } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";
import fbt from "fbt";

import { to_string } from "../../helpers/I64";
import { bumpEntityKey } from "../../helpers/ODS";
import { useIsReactionsV2Enabled } from "../../hooks/useIsReactionsV2Enabled";

import { isDiscoverablePublicBroadcastChannel } from "./LSMessagingThreadTypeUtil";
import { makeSent } from "./MWChatMessageId";
import MWChatReactionsActionContainer from "./MWChatReactionsActionContainer";
import { isBroadcastThread } from "./MWCMThreadTypes.react";
import MWMessageReactionIcon from "./MWMessageReactionIcon";
import { MWV2MessageReactionHooks } from "./MWV2MessageReactionHooks";
import MWXPressable from "./MWXPressable";
import MWXTooltip from "./MWXTooltip";

const styles = {
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
};

const AddReactionButtonInner = forwardRef(
  (
    {
      onHoverInPrerenderer,
      onHoverOutPrerenderer,
      onPressInPrerenderer,
      showPopover,
    },
    ref
  ) => {
    const tooltipText = fbt("Add reaction", "Tooltip for add reaction button");

    const handlePress = useCallback(() => {
      showPopover();
      bumpEntityKey(3185, "mwchat_actions", "reaction");
    }, [showPopover]);

    return (
      <MWXTooltip align="middle" position="above" tooltip={tooltipText}>
        <MWXPressable
          aria-label={tooltipText}
          expanding={true}
          loggingEvent="click_react_to_message"
          onHoverIn={onHoverInPrerenderer}
          onHoverOut={onHoverOutPrerenderer}
          onPress={handlePress}
          onPressIn={onPressInPrerenderer}
          overlayRadius="inherit"
          ref={ref}
          role="button"
          testid={undefined}
          xstyle={styles.emojiRowContainer}
        >
          <div
            className="x6s0dn4 x1vtvx1t xdxvlk3 x1fglp x1rp6h8o xg6i1s1 x78zum5 xl56j7k x10b6aqq xsyo7zv xurb0ha x1yrsyyn relative xp4054r"
            role="none"
          >
            <div className="x6s0dn4 x14yjl9h xudhj91 x18nykt9 xww2gxu x1ypdohk x14ju556 x11i5rnm x78zum5 xdt5ytf xl56j7k x1npj6m0">
              <MWMessageReactionIcon size="1.125rem" />
            </div>
          </div>
        </MWXPressable>
      </MWXTooltip>
    );
  }
);

AddReactionButtonInner.displayName = `AddReactionButtonInner [from ${__filename}]`;

const MWAddReactionButton = ({
  isSecure,
  message,
  sendReaction,
  setShouldRowStayExpanded,
  threadKey,
  threadType,
}) => {
  const threadKeyString = to_string(threadKey);
  const timestampString = to_string(message.timestampMs);
  const messageID = useMemo(
    () => makeSent(threadKeyString, message.messageId, timestampString),
    [threadKeyString, message.messageId, timestampString]
  );

  const isBroadcast = isBroadcastThread(threadType);
  const isDiscoverablePublic = isDiscoverablePublicBroadcastChannel(threadType);
  const isReactionsV2Enabled = useIsReactionsV2Enabled(threadKey);
  const selectedReactions =
    MWV2MessageReactionHooks.useSelectedReactionsV2(message);

  return (
    <MWChatReactionsActionContainer
      alwaysShowEmojiPicker={true}
      closeActionsMenu={emptyFunction}
      disableCustomReactions={isReactionsV2Enabled && isBroadcast}
      hasReactionsV2={isReactionsV2Enabled}
      isBroadcastChannel={isDiscoverablePublic}
      isBroadcastThread={isBroadcast}
      isSecure={isSecure}
      messageID={messageID}
      onVisibilityChange={setShouldRowStayExpanded}
      selectedReactions={selectedReactions ?? undefined}
      sendReaction={sendReaction}
    >
      {(
        ref,
        showPopover,
        _,
        onHoverInPrerenderer,
        onHoverOutPrerenderer,
        onPressInPrerenderer
        // eslint-disable-next-line max-params
      ) => (
        <AddReactionButtonInner
          messageID={messageID}
          onHoverInPrerenderer={onHoverInPrerenderer}
          onHoverOutPrerenderer={onHoverOutPrerenderer}
          onPressInPrerenderer={onPressInPrerenderer}
          ref={ref}
          showPopover={showPopover}
        />
      )}
    </MWChatReactionsActionContainer>
  );
};

MWAddReactionButton.displayName = `MWAddReactionButton [from ${__filename}]`;

export default MWAddReactionButton;
