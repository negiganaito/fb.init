/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

// import MAWSecureAttachmentRenderer from "MAWSecureAttachmentRenderer.react";
// import { equal } from "../../business/helpers/I64";
// import isNewSearchUXEnabled from "../../business/helpers/isNewSearchUXEnabled";
// import { useMemoInt64 } from "./Int64Hooks";
// import { isArmadilloSecure } from "./LSMessagingThreadTypeUtil";
import MWMessageRow from "./MWMessageRow";
// import { useMWPVisibleMessageContext } from "MWPVisibleMessageContext.react";
import { useStopHoveringRef } from "./MWV2MessageActionsVisibility";

function MAWMessageListRow() {
  // {
  // domElementRef,
  // lastEbMessageTime,
  // modal,
  // row,
  // thread,
  // }
  const domElementRef = {
    current: null,
  };
  const lastEbMessageTime = [400, 1643659389];
  const modal = "";
  const thread = {
    threadKey: [1817652, 1550597764],
    lastReadWatermarkTimestampMs: [400, 1925932169],
    authorityLevel: [0, 80],
    mailboxType: [0, 4096],
    threadType: [0, 15],
    folderName: "inbox",
    ongoingCallState: [0, 0],
    parentThreadKey: [0, 0],
    lastActivityTimestampMs: [400, 1925932169],
    needsAdminApprovalForNewParticipant: false,
    threadPictureUrlFallback:
      "/messaging/lightspeed/media_fallback/?entity_id=7806757446106756&entity_type=10&width=200&height=200&efg=eyJkdHciOiIifQ%3D%3D",
    removeWatermarkTimestampMs: [0, 0],
    muteExpireTimeMs: [0, 0],
    muteMentionExpireTimeMs: [0, 0],
    muteCallsExpireTimeMs: [0, 0],
    groupNotificationSettings: [0, 0],
    isAdminSnippet: false,
    snippetSenderContactId: [23284, 2613676364],
    snippetHasEmoji: false,
    hasPersistentMenu: false,
    disableComposerInput: false,
    cannotUnsendReason: [0, 0],
    capabilities: [16780296, 59688924],
    proactiveWarningDismissTime: [0, 0],
    isCustomThreadPicture: false,
    isDisappearingMode: false,
    unreadDisappearingMessageCount: [0, 0],
    lastMessageCtaId: [0, 0],
    consistentThreadFbid: [1817652, 1550597764],
    unsendLimitMs: [-1, 4294967295],
    capabilities2: [9344, 2098179],
    capabilities3: [4096, 0],
    syncGroup: [0, 95],
    threadInvitesEnabled: [0, 0],
    threadInviteLink: "",
    isAllUnreadMessageMissedCallXma: false,
    numUnreadSubthreads: [0, 0],
    isHidden: true,
    threadInvitesEnabledV2: [0, 0],
    inviterId: [23283, 488710136],
    threadTags: [0, 0],
    isReadReceiptsDisabled: false,
    readReceiptsDisabledV2: [0, 0],
    threadSubtype: [0, 26],
    capabilities4: [0, 0],
    clientThreadKey: [1678184699, 1926330398],
    snippet:
      "1911646618##5432445541AQJ14Sn0qJ44++SdKNruHMATtwvNizmQXk9JWDLJGcnhfF+RS2duAuQyS0AFdvV7HIkxVM+vvatPz5Tk9E/2Ox5Ij0BQeU47gyDPDKR/92/rPeXtaXyIhqS6PzDZUsxLQGzJO8fBeN8Vp42HL8lRw+wnimJ8TPnmlR2t1911646618##5432445541",
  };
  const row = {
    message: {
      text: "1911646618##5432445541AQLq44oZUnULsrPKD7Ce2FGoqcCgIUFK6yhyWIufcLpIW1VIQ8OJUKn4RuSV1911646618##5432445541",
      authorityLevel: [0, 80],
      cannotUnsendReason: [0, 3],
      displayedContentTypes: [0, 1],
      editCount: [0, 0],
      forwardScore: [0, 0],
      hasQuickReplies: false,
      hotEmojiSize: [0, 0],
      isAdminMessage: false,
      isCollapsed: false,
      isForwarded: false,
      isUnsent: false,
      messageId: "167_22f9_m_7213837142580409850",
      offlineThreadingId: "7213837142580409850",
      primarySortKey: [400, 1925875614],
      quickReplyType: [0, 0],
      senderId: [23284, 2613676364],
      sendStatus: [0, 2],
      sendStatusV2: [0, 2],
      textHasLinks: false,
      threadKey: [1817652, 1550597764],
      timestampMs: [400, 1925875600],
      transportKey: "WhatsApp",
      unsentTimestampMs: [400, 1925875600],
      viewFlags: [0, 0],
      messageRenderingType: [0, 0],
      isExpired: false,
    },
    nextMessage: {
      text: "1911646618##5432445541AQJ14Sn0qJ44++SdKNruHMATtwvNizmQXk9JWDLJGcnhfF+RS2duAuQyS0AFdvV7HIkxVM+vvatPz5Tk9E/2Ox5Ij0BQeU47gyDPDKR/92/rPeXtaXyIhqS6PzDZUsxLQGzJO8fBeN8Vp42HL8lRw+wnimJ8TPnmlR2t1911646618##5432445541",
      authorityLevel: [0, 80],
      cannotUnsendReason: [0, 3],
      displayedContentTypes: [0, 1],
      editCount: [0, 0],
      forwardScore: [0, 0],
      hasQuickReplies: false,
      hotEmojiSize: [0, 0],
      isAdminMessage: false,
      isCollapsed: false,
      isForwarded: false,
      isUnsent: false,
      messageId: "167_22fa_m_7213837375624320705",
      offlineThreadingId: "7213837375624320705",
      primarySortKey: [400, 1925932169],
      quickReplyType: [0, 0],
      senderId: [23284, 2613676364],
      sendStatus: [0, 2],
      sendStatusV2: [0, 2],
      textHasLinks: false,
      threadKey: [1817652, 1550597764],
      timestampMs: [400, 1925931600],
      transportKey: "WhatsApp",
      unsentTimestampMs: [400, 1925931600],
      viewFlags: [0, 0],
      messageRenderingType: [0, 0],
      isExpired: false,
    },
  };
  const stopHoveringRef = useStopHoveringRef();
  // const isSecure = isArmadilloSecure(thread.threadType);
  // const { visibleMessage } = useMWPVisibleMessageContext();
  const { message: currentMessage } = row;
  // const isThreadSecure = isSecure
  //   ? equal(thread.threadKey, currentMessage.threadKey)
  //   : false;
  const isThreadSecure = false;

  let hasMessageEmphasisRing = false;
  // if (visibleMessage !== null) {
  //   const { messageId, source } = visibleMessage;
  //   switch (source) {
  //     case "Reply":
  //     case "Pinned":
  //       hasMessageEmphasisRing = messageId === currentMessage.messageId;
  //       break;
  //     case "Search":
  //       hasMessageEmphasisRing =
  //         messageId === currentMessage.messageId && isNewSearchUXEnabled();
  //       break;
  //     default:
  //       hasMessageEmphasisRing = false;
  //   }
  // }

  // const renderAttachment = MAWSecureAttachmentRenderer.useRenderAttachment(
  //   hasMessageEmphasisRing
  // );
  // const memoizedThreadType = useMemoInt64(
  //   () => thread.threadType,
  //   [thread.threadType]
  // );
  const memoizedThreadType = thread.threadType;
  // const mediaGroupInfo = useGetMediaGroupInformation(
  //   currentMessage,
  //   isThreadSecure
  // );

  const mediaGroupInfo = null;

  if (
    mediaGroupInfo?.groupId !== null &&
    !mediaGroupInfo.isFirstMediaMessageInGroup
  ) {
    return null;
  }

  const messageRowProps = {
    containerThreadKey: thread.threadKey,
    domElementRef,
    hasMessageEmphasisRing,
    isMediaGroupLastMessage: mediaGroupInfo?.isMediaGroupLastMessage,
    isModal: modal === currentMessage.messageId,
    isSecureMessage: isThreadSecure,
    lastEbMessageTime,
    message: currentMessage,
    nextMessage: row.nextMessage,
    prevMessage: row.prevMessage,
    // renderAttachment,
    stopHoveringRef,
    threadType: memoizedThreadType,
  };

  return <MWMessageRow {...messageRowProps} />;
}

MAWMessageListRow.displayName = `MAWMessageListRow [from ${__filename}]`;

export default MAWMessageListRow;
