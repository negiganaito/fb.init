/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useState } from "react";
import fbt from "fbt";
import * as MWPromptCreationUtils from "MWPromptCreationUtils";

import FBLogger from "../../helpers/FBLogger";
import gkx from "../../helpers/gkx";
import { to_string } from "../../helpers/I64";
import recoverableViolation from "../../helpers/recoverableViolation";
import useReStore from "../../hooks/useReStore";

import { cometPushErrorToast } from "./cometPushErrorToast";
import { FocusRegion } from "./FocusRegion.react";
import MWChatPromptFlyoutBackCard from "./MWChatPromptFlyoutBackCard";
import MWChatPromptFlyoutCTAButton from "./MWChatPromptFlyoutCTAButton";
import MWChatPromptFlyoutDisclaimer from "./MWChatPromptFlyoutDisclaimer";
import MWChatPromptFlyoutErrorMessage from "./MWChatPromptFlyoutErrorMessage";
import MWChatPromptFlyoutFrontCard from "./MWChatPromptFlyoutFrontCard";
import MWChatPromptFlyoutPromptTypeSelector from "./MWChatPromptFlyoutPromptTypeSelector";
import { useActor } from "./MWPActor.react";
import MWXTextReact from "./MWXText.react";
import RollCallPromptType from "./RollCallPromptType";

const MAX_FILE_SIZE = 26214400;

function MWChatPromptFlyout({
  initialFile,
  initialText,
  onClose,
  threadKey,
  threadType,
}) {
  const store = useReStore();
  const actor = useActor();

  const [text, setText] = useState(initialText ?? "");
  const [promptType, setPromptType] = useState(
    initialText !== null ? RollCallPromptType.TEXT : RollCallPromptType.MEDIA
  );
  const [previewUrl, setPreviewUrl] = useState(
    initialFile !== null ? URL.createObjectURL(initialFile) : null
  );
  const [file, setFile] = useState(initialFile ?? undefined);
  const [isError, setIsError] = useState(false);

  const handleFileChange = (files) => {
    const file = files[0];
    if (!file) return;
    if (file.size >= MAX_FILE_SIZE) {
      setIsError(true);
    } else {
      setPreviewUrl(URL.createObjectURL(file));
      setIsError(false);
      setFile(file);
    }
  };

  const handleSend = () => {
    if (file && previewUrl !== null) {
      createRollCallMessage(file, RollCallPromptType.MEDIA);
    } else {
      recoverableViolation("Missing File", "messenger_web_messaging");
    }
  };

  const handleTextSend = () => {
    createRollCallMessage(
      text,
      promptType,
      promptType === RollCallPromptType.MEDIA ? file : undefined
    );
  };

  const createRollCallMessage = async (content, type, file) => {
    try {
      const fileUrl = file ? URL.createObjectURL(file) : undefined;
      const prompt = await MWPromptCreationUtils.createAuthoritiativeRollCall(
        store,
        threadKey,
        content,
        type
      );
      const optimisticMessage =
        await MWPromptCreationUtils.createOptimisticRollCallMessage(
          store,
          actor,
          threadKey,
          threadType,
          prompt,
          content,
          type,
          fileUrl,
          file?.type
        );
      if (file && optimisticMessage) {
        MWPromptCreationUtils.startRollCallMediaUpload(
          file,
          prompt,
          optimisticMessage,
          to_string(threadKey)
        );
      }
    } catch (error) {
      FBLogger("messenger_web_messaging")
        .catching(error)
        .mustfix("Creating prompt");
      cometPushErrorToast({
        message: fbt("__JHASH___58Ig9CWslh__JHASH__"),
      });
    }
  };

  const shouldShowPromptTypeSelector = gkx("23420");
  const isTextarea = useCallback((element) => element === "textarea", []);

  return (
    <FocusRegion autoFocusQuery={isTextarea}>
      <div className="x6s0dn4 x9f619 x78zum5 xdt5ytf x13hwc6b xyamay9 x1pi30zi x1l90r2v x1swvt13 x1m258z3">
        <div className="xbaz6xv">
          <MWXTextReact type="headlineEmphasized4">
            {fbt("__JHASH__ALK-qDDamkT__JHASH__")}
          </MWXTextReact>
        </div>
        <div className="relative">
          {promptType === RollCallPromptType.MEDIA && (
            <MWChatPromptFlyoutBackCard
              isVideo={file?.type?.startsWith("video/") ?? false}
              previewUrl={previewUrl}
            />
          )}
          <MWChatPromptFlyoutFrontCard
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <MWChatPromptFlyoutDisclaimer promptType={promptType} />
        {isError && <MWChatPromptFlyoutErrorMessage />}
        {shouldShowPromptTypeSelector && !initialFile && !initialText && (
          <MWChatPromptFlyoutPromptTypeSelector
            promptType={promptType}
            setPromptType={setPromptType}
          />
        )}
        <MWChatPromptFlyoutCTAButton
          isSendDisabled={text.trim() === ""}
          onFilesSelected={handleFileChange}
          onPressSend={
            shouldShowPromptTypeSelector ? handleTextSend : handleSend
          }
          showFileSelector={
            promptType === RollCallPromptType.MEDIA && previewUrl === null
          }
        />
      </div>
    </FocusRegion>
  );
}

MWChatPromptFlyout.displayName = `${MWChatPromptFlyout.name} [from ${module.id}]`;

export default MWChatPromptFlyout;
