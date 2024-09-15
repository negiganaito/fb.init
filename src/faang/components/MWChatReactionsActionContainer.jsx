/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext, useState } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import { MWV2MessageRowIsRowFocusedContext } from "../../context/MWV2MessageRowIsRowFocusedContext";

import JSResourceForInteraction from "./JSResourceForInteraction";
import MWXLazyPopoverTrigger from "./MWXLazyPopoverTrigger";
import MWXPopoverLoadingStateReact from "./MWXPopoverLoadingState";

const styles = {
  popoverLoading: {
    minHeight: "x1wiwyrm",
    minWidth: "x1q6reyq",
    ,
  },
};

const MWChatReactionsActionContainer = ({
  align = "middle",
  alwaysShowEmojiPicker = false,
  children,
  closeActionsMenu,
  disableCustomReactions = false,
  hasReactionsV2,
  isBroadcastChannel,
  isBroadcastThread,
  isSecure = false,
  messageID,
  onVisibilityChange,
  reactionsPopoverResource,
  selectedReactions,
  sendReaction,
}) => {
  const { setFocused } = useContext(MWV2MessageRowIsRowFocusedContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const defaultResource = JSResourceForInteraction(
    "MWChatReactionsMenu.react"
  ).__setRef("MWChatReactionsActionContainer.react");
  const popoverResource = reactionsPopoverResource ?? defaultResource;

  const firstSelectedReaction =
    selectedReactions?.length > 0 ? selectedReactions[0] : undefined;
  const shouldShowEmojiPicker = alwaysShowEmojiPicker || showEmojiPicker;

  const handleSelect = useCallback(
    (reaction) => {
      const shouldToggle =
        firstSelectedReaction !== null &&
        hasReactionsV2 !== true &&
        firstSelectedReaction === reaction;
      sendReaction(reaction, shouldToggle);
      return closeActionsMenu();
    },
    [firstSelectedReaction, hasReactionsV2, sendReaction, closeActionsMenu]
  );

  const handleVisibilityChange = useCallback(
    (isVisible) => {
      if (!isVisible) setShowEmojiPicker(false);
      onVisibilityChange(isVisible);
      setFocused(isVisible);
    },
    [onVisibilityChange, setFocused]
  );

  return (
    <MWXLazyPopoverTrigger
      align={align === "end_" ? "end" : align}
      fallback={
        <MWXPopoverLoadingStateReact
          withArrow={false}
          xstyle={styles.popoverLoading}
        />
      }
      onVisibilityChange={handleVisibilityChange}
      popoverProps={{
        closeActionsMenu,
        disableCustomReactions,
        isBroadcastChannel,
        isBroadcastThread,
        isSecure,
        messageID,
        onClose: emptyFunction,
        onSelect: handleSelect,
        selectedReactions,
        setShowEmojiPicker,
        showEmojiPicker: shouldShowEmojiPicker,
      }}
      popoverResource={popoverResource}
      popoverType={shouldShowEmojiPicker ? "dialog" : "menu"}
      position={shouldShowEmojiPicker ? "below" : "above"}
    >
      {children}
    </MWXLazyPopoverTrigger>
  );
};

MWChatReactionsActionContainer.displayName = `MWChatReactionsActionContainer [from ${__filename}]`;

export default MWChatReactionsActionContainer;
