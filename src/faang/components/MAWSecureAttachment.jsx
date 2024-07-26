/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useMemo } from "react";
import {
  I64,
  LSAuthorityLevel,
  LSIntEnum,
  MAWAttachmentBlob,
  MAWGetAttachmentThumbnailBlob,
  MAWSecureAudioAttachmentContent,
  MAWSecureFileAttachmentContent,
  MAWSecureGroupedImageAttachment,
  MAWSecureImageAttachmentContent,
  MAWSecureStickerAttachmentContent,
  MAWSecureVideoAttachmentContent,
  MAWSecureXMAAttachmentContent,
  MessagingAttachmentType,
  MWChatBubbleEmphasisRing,
  MWPMessageListAttachmentContainer,
  MWV2AttachmentLoadingPlaceholder,
  ReQL,
  ReQLSuspense,
  useGetMediaGroupInformation,
  useIssueReceiverFetchTask,
  useMAWDownloadMediaInWorker,
  useReStore,
} from "some-module"; // Replace 'some-module' with the actual module name

function AttachmentContent({
  dbAttachment,
  connectBottom,
  connectTop,
  hasText,
  mediaRenderQpl,
  message,
  outgoing,
}) {
  const {
    attachmentFbid,
    attachmentType,
    authorityLevel,
    previewHeight,
    previewWidth,
    previewHeightLarge,
    previewWidthLarge,
    attributionAppName,
  } = dbAttachment;

  useEffect(() => {
    if (dbAttachment !== null) {
      mediaRenderQpl?.addAttachmentAnnotations(dbAttachment);
      mediaRenderQpl?.addPoint("render-attachment");
    } else {
      mediaRenderQpl?.addPoint("missing-attachment");
    }
    if (
      attachmentFbid === I64.to_string(I64.max_int) &&
      I64.equal(authorityLevel, LSIntEnum.ofNumber(LSAuthorityLevel.OPTIMISTIC))
    ) {
      mediaRenderQpl?.addPoint("loading_eb_frontloading");
    }
  }, [attachmentFbid, authorityLevel, dbAttachment, mediaRenderQpl]);

  useMAWDownloadMediaInWorker(dbAttachment, mediaRenderQpl);

  const mediaGroupInfo = useGetMediaGroupInformation(message, true);

  const height =
    previewHeight !== null
      ? I64.to_float(previewHeight)
      : previewHeightLarge !== null
      ? I64.to_float(previewHeightLarge)
      : undefined;
  const width =
    previewWidth !== null
      ? I64.to_float(previewWidth)
      : previewWidthLarge !== null
      ? I64.to_float(previewWidthLarge)
      : undefined;

  switch (true) {
    case attachmentFbid === I64.to_string(I64.max_int) &&
      I64.equal(
        authorityLevel,
        LSIntEnum.ofNumber(LSAuthorityLevel.OPTIMISTIC)
      ):
      return (
        <MWV2AttachmentLoadingPlaceholder
          connectBottom={connectBottom}
          connectTop={connectTop}
          hasAppAttribution={attributionAppName !== null}
          height={height}
          mediaRenderQpl={mediaRenderQpl}
          outgoing={outgoing}
          width={width}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.IMAGE)
    ):
      return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {MAWSecureGroupedImageAttachment !== null &&
          mediaGroupInfo !== null ? (
            <MAWSecureGroupedImageAttachment
              mediaGroupInfo={mediaGroupInfo}
              mediaRenderQpl={mediaRenderQpl}
              outgoing={outgoing}
            />
          ) : (
            <MAWSecureImageAttachmentContent
              connectBottom={connectBottom}
              connectTop={connectTop}
              dbAttachment={dbAttachment}
              getPlayableUrl={MAWAttachmentBlob.getAttachmentBlob}
              getPreviewUrl={MAWGetAttachmentThumbnailBlob}
              mediaRenderQpl={mediaRenderQpl}
              message={message}
              outgoing={outgoing}
              previewHeight={height}
              previewWidth={width}
            />
          )}
        </>
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.VIDEO)
    ):
      return (
        <MAWSecureVideoAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          getPreviewUrl={MAWAttachmentBlob.getAttachmentBlob}
          mediaRenderQpl={mediaRenderQpl}
          message={message}
          outgoing={outgoing}
          previewHeight={height}
          previewWidth={width}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.AUDIO)
    ):
      return (
        <MAWSecureAudioAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          getPlayableUrl={MAWAttachmentBlob.getAttachmentBlob}
          mediaRenderQpl={mediaRenderQpl}
          message={message}
          outgoing={outgoing}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.ANIMATED_IMAGE)
    ):
      return (
        <MAWSecureImageAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          getPlayableUrl={MAWAttachmentBlob.getAttachmentBlob}
          getPreviewUrl={MAWAttachmentBlob.getAttachmentBlob}
          mediaRenderQpl={mediaRenderQpl}
          message={message}
          outgoing={outgoing}
          previewHeight={height}
          previewWidth={width}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.STICKER)
    ):
      return (
        <MAWSecureStickerAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          getPreviewUrl={MAWAttachmentBlob.getAttachmentBlob}
          mediaRenderQpl={mediaRenderQpl}
          outgoing={outgoing}
          previewHeight={height}
          previewWidth={width}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.XMA)
    ):
      return (
        <MAWSecureXMAAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          hasText={hasText}
          mediaRenderQpl={mediaRenderQpl}
          outgoing={outgoing}
        />
      );
    case I64.equal(
      attachmentType,
      LSIntEnum.ofNumber(MessagingAttachmentType.FILE)
    ):
      return (
        <MAWSecureFileAttachmentContent
          connectBottom={connectBottom}
          connectTop={connectTop}
          dbAttachment={dbAttachment}
          getFileUrl={MAWAttachmentBlob.getAttachmentBlob}
          mediaRenderQpl={mediaRenderQpl}
          outgoing={outgoing}
        />
      );
    default:
      mediaRenderQpl?.endFail("unsupported-attachment");
      return "Unsupported attachment type";
  }
}

AttachmentContent.displayName = `${AttachmentContent.name}]`;

function Attachment({
  connectBottom,
  connectTop,
  hasEmphasisRing,
  hasText,
  mediaRenderQpl,
  message,
  outgoing,
}) {
  const reStore = useReStore();
  const { authorityLevel, messageId, threadKey, xmaReceiverFetchParams } =
    message;

  const dbAttachment = ReQLSuspense.useFirst(
    () =>
      ReQL.fromTableAscending(reStore.tables.attachments).getKeyRange(
        threadKey,
        messageId
      ),
    [reStore, messageId, threadKey, authorityLevel],
    `${__filename.id}:251`
  );

  useIssueReceiverFetchTask(
    messageId,
    xmaReceiverFetchParams,
    dbAttachment?.xmaContentType
  );

  const renderEmphasisRing = useMemo(() => {
    if (hasEmphasisRing === true) {
      return (a, b) => (
        <MWChatBubbleEmphasisRing
          connectBottom={false}
          connectTop={connectTop}
          hasXMA={a}
          outgoing={outgoing}
          precedesXMA={false}
        >
          {b}
        </MWChatBubbleEmphasisRing>
      );
    }
    return undefined;
  }, [connectTop, hasEmphasisRing, outgoing]);

  if (dbAttachment === null) return null;

  return (
    <MWPMessageListAttachmentContainer
      connectTop={connectTop}
      message={message}
      paint={
        I64.equal(
          authorityLevel.attachmentType,
          LSIntEnum.ofNumber(MessagingAttachmentType.AUDIO)
        )
          ? false
          : undefined
      }
      renderEmphasisRing={renderEmphasisRing}
    >
      <AttachmentContent
        connectBottom={connectBottom}
        connectTop={connectTop}
        dbAttachment={dbAttachment}
        hasText={hasText}
        mediaRenderQpl={mediaRenderQpl}
        message={message}
        outgoing={outgoing}
      />
    </MWPMessageListAttachmentContainer>
  );
}

Attachment.displayName = `${Attachment.name}`;

export default Attachment;
