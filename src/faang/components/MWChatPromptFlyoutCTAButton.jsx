/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import { PHOTO_AND_VIDEO } from "../../helpers/fileInputAcceptValues";

import CometFileSelector from "./CometFileSelector";
import MWXButton from "./MWXButton";

function MWChatPromptFlyoutCTAButton({
  isSendDisabled,
  onFilesSelected,
  onPressSend,
  showFileSelector,
}) {
  return showFileSelector ? (
    <CometFileSelector
      accept={PHOTO_AND_VIDEO}
      onFilesSelected={onFilesSelected}
    >
      {({ openFileSelector }) => (
        <MWXButton
          label={fbt("__JHASH__YLEewsPX1Ff__JHASH__")}
          onPress={openFileSelector}
        />
      )}
    </CometFileSelector>
  ) : (
    <MWXButton
      disabled={isSendDisabled}
      label={fbt("__JHASH__racSmevYoYZ__JHASH__")}
      onPress={onPressSend}
    />
  );
}

MWChatPromptFlyoutCTAButton.displayName = `${MWChatPromptFlyoutCTAButton.name}`;

export default MWChatPromptFlyoutCTAButton;
