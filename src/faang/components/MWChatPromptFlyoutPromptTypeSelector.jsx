/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import MWXCircleButton from "./MWXCircleButton";
import MWXIconMessage from "./MWXIconMessage";
import MWXIconPhoto from "./MWXIconPhoto";
import RollCallPromptType from "./RollCallPromptType";

function PromptTypeButton({ icon, isSelected, label, onPress }) {
  return (
    <MWXCircleButton
      color={isSelected ? "primary" : "disabled"}
      icon={icon}
      label={label}
      onPress={onPress}
      size={36}
      type={isSelected ? "overlay-floating" : "deemphasized"}
    />
  );
}

PromptTypeButton.displayName = `${PromptTypeButton.name} [from ${module.id}]`;

function MWChatPromptFlyoutPromptTypeSelector({ promptType, setPromptType }) {
  return (
    <div className="x6s0dn4 x78zum5 x1qughib x1l90r2v x29ncy0">
      <PromptTypeButton
        icon={MWXIconMessage}
        isSelected={promptType === RollCallPromptType.TEXT}
        label={fbt("__JHASH__pixrfe3xOeN__JHASH__")}
        onPress={() => setPromptType(RollCallPromptType.TEXT)}
      />
      <PromptTypeButton
        icon={MWXIconPhoto}
        isSelected={promptType === RollCallPromptType.MEDIA}
        label={fbt("__JHASH__YL2kX1525pI__JHASH__")}
        onPress={() => setPromptType(RollCallPromptType.MEDIA)}
      />
    </div>
  );
}

MWChatPromptFlyoutPromptTypeSelector.displayName = `${MWChatPromptFlyoutPromptTypeSelector.name} [from ${module.id}]`;

export default MWChatPromptFlyoutPromptTypeSelector;
