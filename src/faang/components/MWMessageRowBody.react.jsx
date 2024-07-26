/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Fragment } from "react";
import CometErrorBoundary from "CometErrorBoundary.react";
import CometPlaceholder from "CometPlaceholder.react";
import deferredLoadComponent from "deferredLoadComponent";
import I64 from "I64";
import isMWEditedMessage from "isMWEditedMessage";
import JSResourceForInteraction from "JSResourceForInteraction";
import LSMessagingThreadTypeUtil from "LSMessagingThreadTypeUtil";
import MWClickedMessageContext from "MWClickedMessageContext.react";
import MWExtraPinnedMessagePadding from "MWExtraPinnedMessagePadding.react";
import MWGroupBlockingProtectionUtils from "MWGroupBlockingProtectionUtils";
import MWMessageListLoggingContext from "MWMessageListLoggingContext";
import MWMessagePromptPopoverTrigger from "MWMessagePromptPopoverTrigger.react";
import MWMessageReplyRow from "MWMessageReplyRow.react";
import MWMessageRowActions from "MWMessageRowActions.react";
import MWMessageRowMessageComponent from "MWMessageRowMessageComponent.react";
import MWMessageSearchPluginMustache from "MWMessageSearchPluginMustache.react";
import MWMustacheText from "MWMustacheText";
import MWPBaseMessageListRow from "MWPBaseMessageListRow.react";
import MWPinnedMessageDropdownButton from "MWPinnedMessageDropdownButton.react";
import MWPinnedMessageOverlay from "MWPinnedMessageOverlay.react";
import MWPinnedMessageRowFooterNUXWrapperRequireNUX from "MWPinnedMessageRowFooterNUXWrapperRequireNUX.react";
import MWPMessageIsReply from "MWPMessageIsReply";
import MWPMessageListColumn from "MWPMessageListColumn.react";
import MWPMessageParsingUtils from "MWPMessageParsingUtils";
import MWPMessageReactions from "MWPMessageReactions.react";
import MWSearchPluginUtils from "MWSearchPluginUtils";
import MWV2ChatErrorBubble from "MWV2ChatErrorBubble.react";
import MWV2MessageProfilePhoto from "MWV2MessageProfilePhoto.react";
import { requireDeferredForDisplay } from "requireDeferredForDisplay";
import stylex, { useIsMultiReactEnabled, useMWPGetAttachments } from "stylex";

const MWMessageReactionsContainerV2 = deferredLoadComponent(
  requireDeferredForDisplay("MWMessageReactionsContainerV2.react").__setRef(
    "MWMessageRowBody.react"
  )
);
const MWPEditedMessageHistoryList = deferredLoadComponent(
  requireDeferredForDisplay("MWPEditedMessageHistoryList.react").__setRef(
    "MWMessageRowBody.react"
  )
);

const styles = {
  multiReactContainer: {
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    $$css: true,
  },
  multiReactContainerOutgoing: {
    alignSelf: "xpvyfi4",
    $$css: true,
  },
};

// eslint-disable-next-line complexity
const MWMessageRowBody = ({
  containerThreadKey,
  focused,
  hasClickState,
  hasMessageEmphasisRing,
  hovered,
  incoming,
  isDialogOpened,
  isFirstMessageInGroup,
  isGroupThread,
  isModal,
  isPinnedMessageList,
  isSecureMessage,
  isStandardMessageList,
  mediaRenderQpl,
  message,
  navigateToRouteForMediaViewer,
  nextMessage,
  onRenderError,
  prevMessage,
  // renderAttachment,
  shouldUseReactionsV2,
  threadType,
}) => {
  const reactions = MWPMessageReactions.useReactions(message);
  const reactionsV2 = MWPMessageReactions.useReactionsV2(message);
  const isMultiReactEnabled = useIsMultiReactEnabled(message.threadKey);
  const flowInstanceId = MWMessageListLoggingContext.useFlowInstanceId();
  const { clickedMessageId } = MWClickedMessageContext.useHook();
  const isReply = MWPMessageIsReply(message);
  const isEditedMessage = isMWEditedMessage(message);
  const shouldHideReply =
    MWGroupBlockingProtectionUtils.useMWShouldHideReply(message);
  const isLastMessage = nextMessage === null;
  const isEndOfGroup =
    isPinnedMessageList ||
    MWPMessageParsingUtils.isEndOfGroup(message, nextMessage);
  const isOutgoing = !incoming;
  const isGroupBlocking = incoming && isGroupThread;
  const shouldHideReactions =
    reactions.length > 0 || (reactionsV2.length > 0 && !isMultiReactEnabled);
  const showMultiReactions =
    isMultiReactEnabled &&
    reactionsV2.some((reaction) => I64.to_int32(reaction.count) > 0);
  const attachments = useMWPGetAttachments(message);
  const hasAttachments = attachments.length > 0;
  const isSearchPlugin =
    hasAttachments && MWSearchPluginUtils.isSearchPlugin(attachments[0]);
  const isSearchSingleBubblePlugin =
    hasAttachments &&
    MWSearchPluginUtils.isSearchSingleBubblePlugin(attachments[0]);
  const shouldRenderMultiReactions = showMultiReactions && !shouldHideReactions;

  const renderProfilePhoto = () => (
    <MWV2MessageProfilePhoto
      ariaHidden={isGroupThread ? !isModal : true}
      display={isEndOfGroup ? "visible" : "hidden"}
      isGroupThread={isGroupThread}
      message={message}
    />
  );

  const renderMessageActions = (hidden) =>
    isStandardMessageList ? (
      <MWMessageRowActions
        ariaHidden={isModal === false}
        containerThreadKey={containerThreadKey}
        focused={focused || isDialogOpened || isModal}
        hidden={hidden}
        hovered={hovered}
        message={message}
        outgoing={isOutgoing}
        shouldHideHoverMenuReact={shouldRenderMultiReactions}
        threadType={threadType}
      />
    ) : isPinnedMessageList ? (
      <MWPinnedMessageDropdownButton
        hidden={!hovered && !focused}
        isSecureMessage={isSecureMessage}
        isSecureThread={LSMessagingThreadTypeUtil.isArmadilloSecure(threadType)}
        message={message}
      />
    ) : null;

  const renderMultiReactions = () => {
    if (message.isUnsent) return null;
    if (!isMultiReactEnabled || !reactionsV2?.length) return null;
    return (
      <div
        className={stylex(
          styles.multiReactContainer,
          isOutgoing && styles.multiReactContainerOutgoing
        )}
      >
        <MWPMessageReactions
          message={message}
          outgoing={isOutgoing}
          reactions={reactions}
          reactionsV2={reactionsV2}
        >
          {(
            emojis,
            _,
            __,
            message,
            ____,
            onOpenDialog,
            isMultiReactRowExpanded,
            toggleMultiReactionRowExpansion
            // eslint-disable-next-line max-params
          ) => (
            <CometPlaceholder fallback={null}>
              <MWMessageReactionsContainerV2
                emojis={emojis}
                isMultiReactRowExpanded={isMultiReactRowExpanded}
                message={message}
                onOpenDialog={onOpenDialog}
                outgoing={isOutgoing}
                reactionsV2={reactionsV2}
                toggleMultiReactionRowExpansion={
                  toggleMultiReactionRowExpansion
                }
              />
            </CometPlaceholder>
          )}
        </MWPMessageReactions>
      </div>
    );
  };

  return (
    <>
      {isFirstMessageInGroup && !isGroupBlocking && (
        <MWPMessageListColumn.MWPMessageListColumnVerticalRhythm height={2} />
      )}
      {isReply && !shouldHideReply && (
        <MWMessageReplyRow
          isGroupThread={isGroupThread}
          isSecureMessage={isSecureMessage}
          isStandardMessageList={isStandardMessageList}
          message={message}
          outgoing={isOutgoing}
        />
      )}
      {isEditedMessage && (
        <CometPlaceholder fallback={null}>
          <MWPEditedMessageHistoryList
            editCount={message.editCount}
            isReply={isReply}
            isSecureMessage={isSecureMessage}
            msgId={message.messageId}
            outgoing={isOutgoing}
            threadType={threadType}
          />
        </CometPlaceholder>
      )}
      <MWPBaseMessageListRow.MWPBaseMessageListRowBody
        hasMessageEmphasisRing={hasMessageEmphasisRing}
        hasReactions={shouldHideReactions}
        message={message}
        outgoing={isOutgoing}
        renderGutterItem={() => <div className="x1xc55vz" role="none" />}
        renderMessageActions={renderMessageActions}
        renderMultiReactions={renderMultiReactions}
        renderProfile={renderProfilePhoto}
      >
        <CometErrorBoundary
          // eslint-disable-next-line react/no-unstable-nested-components
          fallback={() => <MWV2ChatErrorBubble isReply={isReply} />}
          onError={onRenderError}
        >
          <MWMessagePromptPopoverTrigger
            attachments={attachments}
            message={message}
          >
            {isPinnedMessageList ? (
              <MWMessageRowMessageComponent
                hasClickState={hasClickState}
                hasMessageEmphasisRing={hasMessageEmphasisRing}
                isFirstMessageInGroup={isFirstMessageInGroup}
                isLastMessageInGroup={isEndOfGroup}
                isSearchPluginAttachment={isSearchPlugin}
                isSecureMessage={isSecureMessage}
                mediaRenderQpl={mediaRenderQpl}
                message={message}
                nextMessage={nextMessage}
                offlineAttachmentId={attachments?.[0]?.offlineAttachmentId}
                outgoing={isOutgoing}
                prevMessage={prevMessage}
                reactions={reactions}
                reactionsV2={shouldUseReactionsV2 ? reactionsV2 : undefined}
                // renderAttachment={renderAttachment}
                threadType={threadType}
              />
            ) : (
              <MWPinnedMessageOverlay
                alreadyRenderedPin={isReply}
                message={message}
                outgoing={isOutgoing}
              >
                <MWMessageRowMessageComponent
                  hasClickState={hasClickState}
                  hasMessageEmphasisRing={hasMessageEmphasisRing}
                  isFirstMessageInGroup={isFirstMessageInGroup}
                  isLastMessageInGroup={isEndOfGroup}
                  isSearchPluginAttachment={isSearchPlugin}
                  isSecureMessage={isSecureMessage}
                  mediaRenderQpl={mediaRenderQpl}
                  message={message}
                  navigateToRouteForMediaViewer={navigateToRouteForMediaViewer}
                  nextMessage={nextMessage}
                  offlineAttachmentId={attachments?.[0]?.offlineAttachmentId}
                  outgoing={isOutgoing}
                  prevMessage={prevMessage}
                  reactions={reactions}
                  reactionsV2={shouldUseReactionsV2 ? reactionsV2 : undefined}
                  // renderAttachment={renderAttachment}
                  threadType={threadType}
                />
              </MWPinnedMessageOverlay>
            )}
          </MWMessagePromptPopoverTrigger>
          {(isSearchPlugin || isSearchSingleBubblePlugin) && (
            <MWMessageSearchPluginMustache
              attachment={attachments[0]}
              botResponseId={message.botResponseId}
              dialogResource={JSResourceForInteraction(
                "MWMessageSearchPluginSourcesDialog.react"
              ).__setRef("MWMessageRowBody.react")}
              flowInstanceId={flowInstanceId.current}
              isSearchSingleBubblePluginAttachment={isSearchSingleBubblePlugin}
            />
          )}
        </CometErrorBoundary>
      </MWPBaseMessageListRow.MWPBaseMessageListRowBody>
      <MWPinnedMessageRowFooterNUXWrapperRequireNUX
        isLastMessage={isLastMessage}
        isOutgoing={isOutgoing}
        isPinnedMessageList={isPinnedMessageList}
        message={message}
      />
      <MWMustacheText message={message} outgoing={isOutgoing} />
      <MWExtraPinnedMessagePadding nextMessage={nextMessage} />
      {hasClickState && clickedMessageId === message.messageId && (
        <MWPMessageListColumn.MWPMessageListColumnVerticalRhythm height={6} />
      )}
      {isEndOfGroup && !isLastMessage && (
        <MWPMessageListColumn.MWPMessageListColumnVerticalRhythm height={6} />
      )}
    </>
  );
};

MWMessageRowBody.displayName =
  "MWMessageRowBody [from " + MWMessageRowBody.id + "]";

export default MWMessageRowBody;
