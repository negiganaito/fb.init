/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  memo,
  startTransition,
  useCallback,
  useId,
  useState,
} from "react";

import { useMWPThreadCapabilitiesContext } from "../../context/MWPThreadCapabilitiesContext";
import { MWShowMessagePromptPopoverContextProvider } from "../../context/MWShowMessagePromptPopoverContext";
import { equal } from "../../helpers/I64";
import { usePickInt64 } from "../../hooks/Int64Hooks";
import useMWMessageRowTheme from "../../hooks/useMWMessageRowTheme";
import useMWPEditMessageDeemphasizer from "../../hooks/useMWPEditMessageDeemphasizer";
import useMWPGetAttachments from "../../hooks/useMWPGetAttachments";
import useNextNonAdminMessage from "../../hooks/useNextNonAdminMessage";

import BaseView from "./BaseView.react";
import { LSIntEnum } from "./LSIntEnum";
import {
  isArmadilloSecure,
  isCMSubthread,
  isDiscoverablePublicBroadcastChannel,
  isGroup,
} from "./LSMessagingThreadTypeUtil";
import MNLSXMALayoutType from "./MNLSXMALayoutType";
import isAnyCMThread from "./MWCMIsAnyCMThread";
import { isBroadcastThread } from "./MWCMThreadTypes.react";
import { useMWMessageDisplayContext } from "./MWMessageDisplayContext.react";
import { MWMessageEditContextProvider } from "./MWMessageEditContext.react";
import { MWMessageListAttachmentContainer } from "./MWMessageListAttachmentContainer.react";
import { MWMessageRowAdminMessage } from "./MWMessageRowAdminMessage.react";
import MWMessageRowBody from "./MWMessageRowBody.react";
import MWMessageRowFooter from "./MWMessageRowFooter.react";
import MWMessageRowHeader from "./MWMessageRowHeader.react";
import MWMessageRowMissingMessagesIndicator from "./MWMessageRowMissingMessagesIndicator.react";
import MWMessageRowUnreadMessagesIndicator from "./MWMessageRowUnreadMessagesIndicator.react";
import { useActor } from "./MWPActor.react";
import { MWPMessageListColumnShrinkwrap } from "./MWPMessageListColumn.react";
import { MWPMessageListRowWithKeyboardInteractions } from "./MWPMessageListRowWithKeyboardInteractions.react";
import { isStartOfGroup } from "./MWPMessageParsingUtils";
import { MWPMessageRowCalculateStatus } from "./MWPMessageRowCalculateStatus";
import MWV2MessageRowSimple from "./MWV2MessageRowSimple.react";
import MWV2MessageStartOfGroupContent from "./MWV2MessageStartOfGroupContent.react";

const styles = {
  adminMessageAttachment: {
    boxSizing: "x9f619",
    maxWidth: "x4ndzw7",
    minWidth: "xwj5yc2",
    paddingBottom: "xdvlbce",
    paddingStart: "x5ib6vp",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xc73u3c",
    paddingTop: "x1nn3v0j",
    $$css: true,
  },
};

const MWPMessageRowCalculateStatusMemo = memo(MWPMessageRowCalculateStatus);

function MessageStatusWrapper({ message, nextMessage, ...props }) {
  return (
    <MWPMessageRowCalculateStatusMemo
      message={usePickInt64(message, [
        "senderId",
        "isUnsent",
        "threadKey",
        "primarySortKey",
        "timestampMs",
        "messageId",
        "isAdminMessage",
        "sendStatusV2",
      ])}
      nextMessage={usePickInt64(nextMessage, [
        "senderId",
        "timestampMs",
        "isAdminMessage",
      ])}
      {...props}
    />
  );
}

const MWMessageRow = memo(
  ({
    containerThreadKey,
    domElementRef,
    hasMessageEmphasisRing,
    isModal,
    isSecureMessage,
    lastEbMessageTime,
    message,
    navigateToRouteForMediaViewer,
    nextMessage,
    prevMessage,
    // renderAttachment,
    shouldRenderUnreadIndicator,
    stopHoveringRef,
    threadType,
    useReactionsV2 = false,
  }) => {
    const displayContext = useMWMessageDisplayContext() ?? "standard";
    const isStandardMessageList = displayContext === "standard";
    const isPinnedMessages = displayContext === "pinnedMessages";

    const actor = useActor();
    const isFirstMessageInGroup =
      isPinnedMessages || isStartOfGroup(message, prevMessage);
    const isCMThread = isAnyCMThread(threadType);
    const isBroadcastThreadType = isBroadcastThread(threadType);
    const isDiscoverableBroadcastChannel =
      isDiscoverablePublicBroadcastChannel(threadType);
    const isGroupThread = isGroup(threadType);
    const isSecureGroupThread = isArmadilloSecure(threadType) && isGroupThread;

    const { seenCountV2Enabled } = useMWPThreadCapabilitiesContext();
    const hasClickState = !message.isUnsent && seenCountV2Enabled;
    const isMessageClickableInThread =
      hasClickState &&
      !isDiscoverableBroadcastChannel &&
      !isCMSubthread(threadType);

    const isOutgoing = equal(message.senderId, actor);
    const { nextNonAdminMessage, isLastMessage } = useNextNonAdminMessage(
      message,
      nextMessage
    );
    const isIncoming = !isOutgoing;

    const [isFocused, setFocused] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const setFocusedInTransition = useCallback(
      (focused) =>
        startTransition(() => {
          setFocused(focused);
        }),
      [setFocused]
    );

    const setHoveredInTransition = useCallback(
      (hovered) =>
        startTransition(() => {
          setHovered(hovered);
        }),
      [setHovered]
    );

    const messageDomID = useId();

    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const theme = useMWMessageRowTheme();

    const attachments = useMWPGetAttachments(message);
    const isXMAStandardLayout =
      attachments.length > 0 &&
      attachments[0].xmaLayoutType !== null &&
      equal(
        attachments[0].xmaLayoutType,
        LSIntEnum.ofNumber(MNLSXMALayoutType.STANDARD_DXMA)
      );
    const isXMASharedStackLayout =
      attachments.length > 0 &&
      attachments[0].xmaLayoutType !== null &&
      equal(
        attachments[0].xmaLayoutType,
        LSIntEnum.ofNumber(MNLSXMALayoutType.SHARED_STACK)
      );

    const deemphasizeStyle = useMWPEditMessageDeemphasizer();

    let messageContent;
    if (message.isAdminMessage) {
      messageContent = (
        <MWMessageRowAdminMessage
          domElementRef={domElementRef}
          isDialogOpened={isDialogOpened}
          isFirstMessageInGroup={isFirstMessageInGroup}
          isFocused={isFocused}
          isModal={isModal}
          message={message}
          messageDomID={messageDomID}
          nextMessage={nextMessage}
          outgoing={isOutgoing}
          prevMessage={prevMessage}
          setFocusedInTransition={setFocusedInTransition}
          setHoveredInTransition={setHoveredInTransition}
          setIsDialogOpened={setIsDialogOpened}
          stopHoveringRef={stopHoveringRef}
        />
      );
    } else if (isXMAStandardLayout || isXMASharedStackLayout) {
      messageContent = (
        <MWPMessageListColumnShrinkwrap centered>
          <MWV2MessageRowSimple>
            <BaseView xstyle={deemphasizeStyle}>
              <MWMessageListAttachmentContainer
                connectBottom={false}
                connectTop={false}
                message={message}
                outgoing={isOutgoing}
                xstyle={styles.adminMessageAttachment}
              />
            </BaseView>
          </MWV2MessageRowSimple>
        </MWPMessageListColumnShrinkwrap>
      );
    } else {
      messageContent = (
        <MWShowMessagePromptPopoverContextProvider>
          <MWMessageEditContextProvider>
            <>
              <MWMessageRowUnreadMessagesIndicator
                shouldRenderUnreadIndicator={shouldRenderUnreadIndicator}
              />
              {isFirstMessageInGroup && isStandardMessageList ? (
                <MWV2MessageStartOfGroupContent
                  message={message}
                  prevMessage={prevMessage}
                />
              ) : null}
              <MessageStatusWrapper
                isBroadcastChannel={isDiscoverableBroadcastChannel}
                isBroadcastThread={isBroadcastThreadType}
                isLargeGroup={false}
                isSecureGroupThread={isSecureGroupThread}
                isSecureThread={isArmadilloSecure(threadType)}
                message={message}
                nextMessage={nextNonAdminMessage}
              >
                {(status) => (
                  <MWPMessageListRowWithKeyboardInteractions
                    domElementRef={domElementRef}
                    isDialogOpened={isDialogOpened}
                    isFocused={isFocused}
                    isModal={isModal}
                    message={message}
                    messageDomID={messageDomID}
                    outgoing={isOutgoing}
                    setFocused={setFocusedInTransition}
                    setHovered={setHoveredInTransition}
                    setIsDialogOpened={setIsDialogOpened}
                    stopHoveringRef={stopHoveringRef}
                    theme={theme}
                  >
                    <MWMessageRowHeader
                      isCMThread={isCMThread}
                      isFirstMessageInGroup={isFirstMessageInGroup}
                      isGroupThread={isGroupThread}
                      isPinnedMessageList={isPinnedMessages}
                      isStandardMessageList={isStandardMessageList}
                      message={message}
                      outgoing={isOutgoing}
                      threadType={threadType}
                    />
                    <MWMessageRowBody
                      containerThreadKey={containerThreadKey}
                      focused={isFocused}
                      hasClickState={isMessageClickableInThread}
                      hasMessageEmphasisRing={hasMessageEmphasisRing}
                      hovered={isHovered}
                      incoming={isIncoming}
                      isDialogOpened={isDialogOpened}
                      isFirstMessageInGroup={isFirstMessageInGroup}
                      isGroupThread={isGroupThread}
                      isModal={isModal}
                      isPinnedMessageList={isPinnedMessages}
                      isSecureMessage={isSecureMessage}
                      isStandardMessageList={isStandardMessageList}
                      message={message}
                      navigateToRouteForMediaViewer={
                        navigateToRouteForMediaViewer
                      }
                      nextMessage={nextMessage}
                      prevMessage={prevMessage}
                      // renderAttachment={renderAttachment}
                      shouldUseReactionsV2={useReactionsV2}
                      threadType={threadType}
                    />
                    <MWMessageRowFooter
                      hasClickState={isMessageClickableInThread}
                      incoming={isIncoming}
                      isBroadcastThread={isBroadcastThread}
                      isLastMessage={isLastMessage}
                      isStandardMessageList={isStandardMessageList}
                      message={message}
                      nextMessage={nextMessage}
                      outgoing={isOutgoing}
                      status={status}
                    />
                  </MWPMessageListRowWithKeyboardInteractions>
                )}
              </MessageStatusWrapper>
            </>
          </MWMessageEditContextProvider>
        </MWShowMessagePromptPopoverContextProvider>
      );
    }

    return (
      <>
        {messageContent}
        <MWMessageRowMissingMessagesIndicator
          lastEbMessageTime={lastEbMessageTime}
          message={message}
          nextMessage={nextMessage}
        />
      </>
    );
  }
);

export default MWMessageRow;
