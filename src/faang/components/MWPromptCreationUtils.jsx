/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { LSFactory } from "LSFactory";
import { LSLocalApplyOptimisticMessageWithAttachmentsV2StoredProcedure } from "LSLocalApplyOptimisticMessageWithAttachmentsV2StoredProcedure";
import { LSMessagingThreadAttributionType } from "LSMessagingThreadAttributionType";
import { LSOptimisticContributeToTextPromptStoredProcedure } from "LSOptimisticContributeToTextPromptStoredProcedure";
import { LSOptimisticCreateRollCallStoredProcedure } from "LSOptimisticCreateRollCallStoredProcedure";
import { LSShape } from "LSShape";
import { LSVec } from "LSVec";
import {
  STACK_ITEM_HEIGHT,
  STACK_ITEM_WIDTH,
} from "MWXMAAttachmentSharedStackConstants";
import { createOfflineThreadingID } from "OfflineThreadingId";
import { Promise as BluebirdPromise } from "Promise";
import { MEDIA } from "RollCallContributionType";
import { XComposerPhotoUploader } from "XComposerPhotoUploader";

import { equal, of_float, to_int32, to_string, zero } from "../../helpers/I64";

import LSAuthorityLevel from "./LSAuthorityLevel";
import { ofNumber } from "./LSIntEnum";
import { MessagingAttachmentType } from "./MessagingAttachmentType";
import { ReQL } from "./ReQL";
import RollCallPromptType from "./RollCallPromptType";

// eslint-disable-next-line max-params
function createAuthoritiativeRollCall(store, threadKey, prompt, promptType) {
  return new BluebirdPromise((resolve, reject) => {
    store
      .runInTransaction((db) => {
        return LSOptimisticCreateRollCallStoredProcedure(LSFactory(db), {
          prompt,
          promptType: ofNumber(promptType),
          threadKey,
        });
      }, "readwrite")
      .then((result) => {
        const offlineThreadingId = result[0];
        const subscription = ReQL.fromTableAscending(
          store.tables.roll_calls
        ).subscribe((event, { operation, value }) => {
          if (operation === "add" || operation === "put") {
            const isAuthoritative =
              to_int32(value.authorityLevel) >= LSAuthorityLevel.AUTHORITATIVE;
            if (
              isAuthoritative &&
              value.offlineThreadingId &&
              equal(value.offlineThreadingId, offlineThreadingId)
            ) {
              subscription();
              resolve(value.rollCallId);
            }
          }
        });
      })
      .catch(reject);
  });
}

// eslint-disable-next-line max-params
function contributeToTextPrompt(store, senderId, threadKey, promptId, text) {
  return store.runInTransaction((db) => {
    return LSOptimisticContributeToTextPromptStoredProcedure(LSFactory(db), {
      productAttribution: String(LSMessagingThreadAttributionType.ROLLCALL),
      promptId: to_string(promptId),
      senderId,
      text: text || "",
      threadKey,
    });
  }, "readwrite");
}

// eslint-disable-next-line max-params
function applyOptimisticMessageWithAttachments(
  store,
  senderId,
  threadKey,
  threadType,
  productFbid,
  text,
  mediaUrl,
  mimeType
) {
  const offlineThreadingId = createOfflineThreadingID();
  const isVideo = mimeType ? mimeType.startsWith("video/") : false;

  return store
    .runInTransaction((db) => {
      return LSLocalApplyOptimisticMessageWithAttachmentsV2StoredProcedure(
        LSFactory(db),
        {
          extraSendMessageParams: LSShape.ofRecord({
            attachments: LSVec.ofArray([
              LSShape.ofRecord({
                attachment_fbid: offlineThreadingId,
                attachment_index: zero,
                attachment_type: ofNumber(
                  isVideo
                    ? MessagingAttachmentType.VIDEO
                    : MessagingAttachmentType.IMAGE
                ),
                has_media: true,
                has_xma: true,
                offline_attachment_id: offlineThreadingId,
                playable_url: isVideo ? mediaUrl : undefined,
                preview_height: of_float(STACK_ITEM_HEIGHT),
                preview_url: isVideo ? undefined : mediaUrl,
                preview_url_mime_type: isVideo ? undefined : mimeType,
                preview_width: of_float(STACK_ITEM_WIDTH),
              }),
            ]),
            contribution_type: ofNumber(MEDIA),
            product_fbid: to_string(productFbid),
            product_type: "roll_call",
            source: ofNumber(LSMessagingThreadAttributionType.ROLLCALL),
          }),
          senderId,
          text,
          threadKey,
          threadType,
        }
      );
    }, "readwrite")
    .then((result) => result[0]);
}

// eslint-disable-next-line max-params
function createOptimisticRollCallMessage(
  store,
  senderId,
  threadKey,
  threadType,
  promptId,
  text,
  promptType,
  mediaUrl,
  mimeType
) {
  switch (promptType) {
    case RollCallPromptType.MEDIA:
      return applyOptimisticMessageWithAttachments(
        store,
        senderId,
        threadKey,
        threadType,
        promptId,
        text,
        mediaUrl,
        mimeType
      );
    case RollCallPromptType.TEXT:
      return contributeToTextPrompt(store, senderId, threadKey, promptId, text);
    default:
      return BluebirdPromise.reject("Unsupported type");
  }
}

// eslint-disable-next-line max-params
function startRollCallMediaUpload(file, rollCallId, messageId, threadId) {
  const uploadId = createOfflineThreadingID();
  file.uploadID = uploadId;

  const uploader = new XComposerPhotoUploader({
    onUploadFailure: (error, file) => {},
    onUploadSuccess: (response, file) => {},
    uploadEndpoint: "/messenger/upload_roll_call/",
  });

  uploader
    .getAsyncFileUploadRequest([file], [uploadId], {
      data: {
        message_otid: messageId,
        roll_call_id: to_string(rollCallId),
        thread_id: threadId,
      },
    })
    .send();
}

export {
  createAuthoritiativeRollCall,
  createOptimisticRollCallMessage,
  startRollCallMediaUpload,
};
