/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { useMWMessageListDisplayContext } from "MWMessageListDisplayContext.react";
import MWRepliedMessage from "MWRepliedMessage.react";
import { useMediaRenderQplForReply } from "MWThreadViewMediaRenderQpl";
import MWV2MessageProfilePhoto from "MWV2MessageProfilePhoto.react";
import useMWIsReplyToAuthor from "useMWIsReplyToAuthor";

import { gt, zero } from "../../helpers/I64";

import CometErrorBoundary from "./CometErrorBoundary";
import MWPinnedMessageOverlay from "./MWPinnedMessageOverlay";
import { MWPMessageListColumnProfile } from "./MWPMessageListColumn";
import MWV2ReplyError from "./MWV2ReplyError";
import MWXMessageBubbleRow from "./MWXMessageBubbleRow";

const styles = {
  replyMargin: {
    marginBottom: "x1oo3vh0",
    minHeight: "x1hshjfz",
    ,
  },
};

const MWMessageReplyRow = ({
  outgoing,
  isGroupThread,
  isSecureMessage,
  message,
  threadType,
}) => {
  const { isStandardMessageList } = useMWMessageListDisplayContext();
  const isReplyToAuthor = useMWIsReplyToAuthor(message);

  const hasReplyMargin =
    isReplyToAuthor ||
    (message.replySourceId === null
      ? false
      : message.replyMediaExpirationTimestampMs !== null
      ? gt(message.replyMediaExpirationTimestampMs, zero())
      : true);

  const profilePhoto = (
    <MWPMessageListColumnProfile>
      <MWV2MessageProfilePhoto
        display="hidden"
        isGroupThread={isGroupThread}
        message={message}
      />
    </MWPMessageListColumnProfile>
  );

  const spacer = <div className="x1xc55vz" role="none" />;

  const mediaRenderQpl = useMediaRenderQplForReply(message, threadType);

  return (
    <MWXMessageBubbleRow
      addOnEnd={outgoing ? profilePhoto : spacer}
      addOnStart={outgoing ? spacer : profilePhoto}
      align={outgoing ? "right" : "left"}
      opaque={true}
      xstyle={hasReplyMargin && styles.replyMargin}
    >
      <CometErrorBoundary
        // eslint-disable-next-line react/no-unstable-nested-components
        fallback={(_error) => <MWV2ReplyError outgoing={outgoing} />}
      >
        {isStandardMessageList ? (
          <MWPinnedMessageOverlay
            alreadyRenderedPin={false}
            message={message}
            outgoing={outgoing}
          >
            <MWRepliedMessage
              isSecureMessage={isSecureMessage}
              mediaRenderQpl={mediaRenderQpl}
              message={message}
              outgoing={outgoing}
            />
          </MWPinnedMessageOverlay>
        ) : (
          <MWRepliedMessage
            isSecureMessage={isSecureMessage}
            mediaRenderQpl={mediaRenderQpl}
            message={message}
            outgoing={outgoing}
          />
        )}
      </CometErrorBoundary>
    </MWXMessageBubbleRow>
  );
};

MWMessageReplyRow.displayName = `MWMessageReplyRow [from ${__filename}]`;

export default MWMessageReplyRow;
