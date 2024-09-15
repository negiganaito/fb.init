/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useState } from "react";
import err from "err";
import fetch from "fetch";
import { useOnShowGenericErrorToast } from "GroupsCometChatCreateUtils";
import Promise from "Promise";
import { ATTACHMENT_TYPES_THAT_ALLOW_PROMPTS } from "useShouldAllowRollCallForMessage";
import { WebUXLoggingSurfaceContextProvider } from "WebUXLoggingSurfaceContextProvider";

import FBLogger from "../../helpers/FBLogger";
import { equal } from "../../helpers/I64";
import isStringNullOrEmpty from "../../helpers/isStringNullOrEmpty";
import { useEffectInt64 } from "../../hooks/Int64Hooks";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import useMWPGetAttachments from "../../hooks/useMWPGetAttachments";

import CometErrorBoundary from "./CometErrorBoundary";
import { ofNumber } from "./LSIntEnum";
import { MAWVault, unvault } from "./MAWVault";
import { MessagingAttachmentType } from "./MessagingAttachmentType";
import MWChatPromptFlyout from "./MWChatPromptFlyout";
import { useThreadExn } from "./MWLSThread";
import MWXPopover from "./MWXPopover";

const MWMessagePromptPopover = ({ message, onClose }) => {
  const [file, setFile] = useState(null);
  const threadKey = message.threadKey;
  const thread = useThreadExn(threadKey);
  const attachments = useMWPGetAttachments(message);
  const isMountedRef = useIsMountedRef();
  const showGenericErrorToast = useOnShowGenericErrorToast();

  useEffectInt64(() => {
    if (attachments.length === 0 || !isStringNullOrEmpty(message.text)) return;

    Promise.resolve()
      .then(async () => {
        const attachment = attachments.find((attachment) => {
          const attachmentType =
            attachment.attachmentType !== null
              ? attachment.attachmentType
              : ofNumber(MessagingAttachmentType.NONE);
          // eslint-disable-next-line max-nested-callbacks
          return ATTACHMENT_TYPES_THAT_ALLOW_PROMPTS.some((type) =>
            equal(attachmentType, ofNumber(type))
          );
        });

        if (attachment === null) throw err("No valid attachment found");
        const { filename, playableUrl } = attachment;
        if (playableUrl === null || filename === null)
          throw err("Invalid attachment");

        const response = await fetch(playableUrl);
        if (!response.ok) throw err("Failed to fetch attachment");

        const blob = await response.blob();
        if (isMountedRef.current) {
          setFile(new File([blob], filename, { type: blob.type }));
        }
      })
      .catch((error) => {
        FBLogger("messenger_web_media")
          .catching(error)
          .mustfix("Constructing File from message");
        showGenericErrorToast();
      });
  }, [attachments, isMountedRef, message.text]);

  return (
    <CometErrorBoundary>
      <WebUXLoggingSurfaceContextProvider value="message_list">
        <MWXPopover withArrow>
          {isStringNullOrEmpty(message.text) ? (
            file !== null ? (
              <MWChatPromptFlyout
                initialFile={file}
                onClose={onClose}
                threadKey={threadKey}
                threadType={thread.threadType}
              />
            ) : null
          ) : (
            <MWChatPromptFlyout
              initialText={
                MAWVault === null ? message.text : unvault(message.text)
              }
              onClose={onClose}
              threadKey={threadKey}
              threadType={thread.threadType}
            />
          )}
        </MWXPopover>
      </WebUXLoggingSurfaceContextProvider>
    </CometErrorBoundary>
  );
};

MWMessagePromptPopover.displayName = `${MWMessagePromptPopover.name} [from ${module.id}]`;

export default MWMessagePromptPopover;
