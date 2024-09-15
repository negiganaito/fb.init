/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback } from "react";
import stylex from "@stylex/stylex";
import fbt from "fbt";
import { MWAudioPlayer } from "MWAudioPlayer.react";
import { useMWLSThreadDisplayContext } from "MWLSThreadDisplayContext";
import { getMaxPreviewHeightAndWidth } from "MWMessageListImageSizingUtils";
import MWV2ChatImage from "MWV2ChatImage.react";
import MWV2ChatVideo from "MWV2ChatVideo.react";
import MWV2Sticker from "MWV2Sticker.react";
import MWV2TombstonedMessage from "MWV2TombstonedMessage.react";
import recoverableViolation from "recoverableViolation";

import { playableUrl, previewUrl } from "./LSMediaUrlAttachment";

const MWMessageListAttachmentError = ({ isOutgoing, xstyle }) => (
  <div className={stylex(xstyle)}>
    <MWV2TombstonedMessage isOutgoing={isOutgoing}>
      {fbt("__JHASH__962PS6SI-P2__JHASH__")}
    </MWV2TombstonedMessage>
  </div>
);

MWMessageListAttachmentError.displayName = `${MWMessageListAttachmentError.name} [from ${MWMessageListAttachmentError.id}]`;

const MWMessageListAttachmentVideo = ({
  attachment,
  connectTop,
  mediaRenderQpl,
  message,
  navigateToRouteForMediaViewer,
  outgoing,
}) => {
  const getPreviewUrl = useCallback(
    (attachment) => playableUrl(attachment),
    []
  );

  return (
    <MWV2ChatVideo
      attachment={attachment}
      connectTop={connectTop}
      getPreviewUrl={getPreviewUrl}
      mediaRenderQpl={mediaRenderQpl}
      message={message}
      navigateToRouteForMediaViewer={navigateToRouteForMediaViewer}
      outgoing={outgoing}
    />
  );
};

MWMessageListAttachmentVideo.displayName = `${MWMessageListAttachmentVideo.name} [from ${MWMessageListAttachmentVideo.id}]`;

const MWMessageListAttachmentAudio = ({
  attachment,
  connectBottom,
  connectTop,
  isReply,
  mediaRenderQpl,
  message,
  outgoing,
}) => {
  const getPlayableUrl = useCallback(
    (attachment) => playableUrl(attachment),
    []
  );

  return (
    <MWAudioPlayer
      attachment={attachment}
      connectBottom={connectBottom}
      connectTop={connectTop}
      getPlayableUrl={getPlayableUrl}
      isReply={isReply}
      mediaRenderQpl={mediaRenderQpl}
      message={message}
      outgoing={outgoing}
    />
  );
};

MWMessageListAttachmentAudio.displayName = `${MWMessageListAttachmentAudio.name} [from ${MWMessageListAttachmentAudio.id}]`;

const MWMessageListAttachmentImage = ({
  attachment,
  connectBottom,
  connectTop,
  mediaRenderQpl,
  message,
  navigateToRouteForMediaViewer,
  outgoing,
  renderUnsupportedAttachment,
}) => {
  const threadDisplayContext = useMWLSThreadDisplayContext();
  const getPreviewUrl = useCallback(
    (attachment) => {
      const previewUrlLarge = attachment.previewUrlLarge;
      return previewUrlLarge !== null && threadDisplayContext === "Inbox"
        ? previewUrlLarge
        : previewUrl(attachment);
    },
    [threadDisplayContext]
  );

  const { maxHeight, maxWidth } = getMaxPreviewHeightAndWidth(
    false,
    threadDisplayContext ?? undefined,
    false
  );
  const getPlayableUrl = (attachment) => playableUrl(attachment);

  return (
    <MWV2ChatImage
      attachment={attachment}
      connectBottom={connectBottom}
      connectTop={connectTop}
      getPlayableUrl={getPlayableUrl}
      getPreviewUrl={getPreviewUrl}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      mediaRenderQpl={mediaRenderQpl}
      message={message}
      navigateToRouteForMediaViewer={navigateToRouteForMediaViewer}
      outgoing={outgoing}
      renderUnsupportedAttachment={renderUnsupportedAttachment}
    />
  );
};

MWMessageListAttachmentImage.displayName = `${MWMessageListAttachmentImage.name} [from ${MWMessageListAttachmentImage.id}]`;

const MWMessageListAttachmentSticker = ({ attachment, mediaRenderQpl }) => {
  const getPreviewUrl = useCallback((attachment) => {
    let url = playableUrl(attachment) ?? previewUrl(attachment);
    if (url !== null) return url;
    recoverableViolation(
      `Sticker Attachment has no preview_url or playable_url: ${attachment.attachmentFbid}`,
      "messenger_web_media"
    );
  }, []);

  return (
    <MWV2Sticker
      attachment={attachment}
      getPreviewUrl={getPreviewUrl}
      mediaRenderQpl={mediaRenderQpl}
    />
  );
};

MWMessageListAttachmentSticker.displayName = `${MWMessageListAttachmentSticker.name} [from ${MWMessageListAttachmentSticker.id}]`;

export {
  MWMessageListAttachmentAudio,
  MWMessageListAttachmentError,
  MWMessageListAttachmentImage,
  MWMessageListAttachmentSticker,
  MWMessageListAttachmentVideo,
};
