/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { memo } from "react";
import CometErrorBoundary from "CometErrorBoundary.react";
import MWChatBubbleEmphasisRing from "MWChatBubbleEmphasisRing.react";
import { useMWLSThreadDisplayContext } from "MWLSThreadDisplayContext";
import {
  MWMessageListAttachmentAudio,
  MWMessageListAttachmentError,
  MWMessageListAttachmentImage,
  MWMessageListAttachmentSticker,
  MWMessageListAttachmentVideo,
} from "MWMessageListAttachment.react";
import MWPMessageIsReply from "MWPMessageIsReply";
import MWPMessageListAttachment from "MWPMessageListAttachment.react";
import MWV2ChatFileV2 from "MWV2ChatFileV2.react";
import MWV2ChatImagesGrid from "MWV2ChatImagesGrid.react";
import MWV2UnsupportedAttachment from "MWV2UnsupportedAttachment.react";
import MWXMAAttachment from "MWXMAAttachment.react";
import MWXMessageBubble from "MWXMessageBubble.react";

function MWMessageListAttachmentContainer({
  connectBottom,
  connectTop,
  hasEmphasisRing = false,
  hasText = false,
  message,
  navigateToRouteForMediaViewer,
  outgoing,
  xstyle,
}) {
  const context = useMWLSThreadDisplayContext();
  const cardWidth = context === "ChatTab" ? 180 : undefined;

  return (
    <MWPMessageListAttachment
      connectBottom={connectBottom}
      connectTop={connectTop}
      message={message}
      renderAudioAttachment={(attachment) => (
        <MWMessageListAttachmentAudio
          attachment={attachment}
          connectBottom={connectBottom}
          connectTop={connectTop}
          isReply={MWPMessageIsReply(message)}
          message={message}
          outgoing={outgoing}
        />
      )}
      renderEmphasisRing={
        hasEmphasisRing
          ? (hasXMA, children) => (
              <MWChatBubbleEmphasisRing
                connectBottom={false}
                connectTop={connectTop}
                hasXMA={hasXMA}
                outgoing={outgoing}
                precedesXMA={false}
              >
                {children}
              </MWChatBubbleEmphasisRing>
            )
          : undefined
      }
      renderEphemeralMediaAttachment={() => null}
      renderFileAttachment={(attachment) => (
        <MWXMessageBubble
          align={outgoing ? "right" : "left"}
          color="incoming"
          connectBottom={connectBottom}
          connectTop={connectTop}
          style={{ padding: 0 }}
        >
          <MWV2ChatFileV2 attachment={attachment} />
        </MWXMessageBubble>
      )}
      // eslint-disable-next-line max-params
      renderImageAttachment={(attachment, top, bottom, unsupported) => (
        <MWMessageListAttachmentImage
          attachment={attachment}
          connectBottom={bottom}
          connectTop={top}
          message={message}
          navigateToRouteForMediaViewer={navigateToRouteForMediaViewer}
          outgoing={outgoing}
          renderUnsupportedAttachment={unsupported}
        />
      )}
      renderImageGrid={(attachments) => (
        <MWV2ChatImagesGrid attachments={attachments} />
      )}
      renderStickerAttachment={(attachment) => (
        <MWMessageListAttachmentSticker attachment={attachment} />
      )}
      renderUnsupportedAttachment={(attachment) => (
        <MWXMessageBubble
          align={outgoing ? "right" : "left"}
          color="incoming"
          connectBottom={connectBottom}
          connectTop={connectTop}
        >
          <MWV2UnsupportedAttachment attachment={attachment} />
        </MWXMessageBubble>
      )}
      renderVideoAttachment={(attachment) => (
        <MWMessageListAttachmentVideo
          attachment={attachment}
          connectTop={connectTop}
          message={message}
          navigateToRouteForMediaViewer={navigateToRouteForMediaViewer}
          outgoing={outgoing}
        />
      )}
      renderXMAAttachment={(attachment) => (
        <CometErrorBoundary
          // eslint-disable-next-line react/no-unstable-nested-components
          fallback={() => (
            <MWMessageListAttachmentError
              connectBottom={connectBottom}
              connectTop={connectTop}
              xstyle={xstyle}
            />
          )}
        >
          <MWXMAAttachment
            attachment={attachment}
            cardWidth={cardWidth}
            connectBottom={connectBottom}
            connectTop={connectTop}
            hasText={hasText}
            mediaRenderQpl={null}
            outgoing={outgoing}
            xstyle={xstyle}
          />
        </CometErrorBoundary>
      )}
    />
  );
}

MWMessageListAttachmentContainer.displayName =
  "MWMessageListAttachmentContainer";

export default memo(MWMessageListAttachmentContainer);
