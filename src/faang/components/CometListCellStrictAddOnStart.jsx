/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ARIA_LABEL_PLACEHOLDER_FIXME from "ARIA_LABEL_PLACEHOLDER_FIXME";
import CometImageFromIXValueRelayWrapper from "CometImageFromIXValueRelayWrapper.react";
// import CometProfilePhoto from "CometProfilePhoto.react";
// import FDSProfilePhotoForActor from "FDSProfilePhotoForActor.react";
import FDSProgressSkittleIndeterminate from "FDSProgressSkittleIndeterminate.react";
import FDSSkittleEmoji from "FDSSkittleEmoji.react";
import MWJewelThreadFacepile from "MWJewelThreadFacepile.react";

import FDSIcon from "./FDSIcon";
import FDSSkittleIcon from "./FDSSkittleIcon";
import FDSTooltip from "./FDSTooltip";

const CometListCellStrictAddOnStart = ({ addOnStart, disabled }) => {
  switch (addOnStart.type) {
    case "icon":
      // eslint-disable-next-line no-case-declarations
      const { tooltip, ...iconProps } = addOnStart;
      // eslint-disable-next-line no-case-declarations
      const iconElement = <FDSIcon {...iconProps} disabled={disabled} />;
      return tooltip !== null ? (
        <FDSTooltip tooltip={tooltip}>{iconElement}</FDSTooltip>
      ) : (
        iconElement
      );
    // case "profile-photo":
    //   // eslint-disable-next-line no-case-declarations
    //   const profilePhotoProps = { ...addOnStart };
    //   return <CometProfilePhoto {...profilePhotoProps} />;

    // case "profile-photo-for-actor":
    //   // eslint-disable-next-line no-case-declarations
    //   const profilePhotoForActorProps = { ...addOnStart };
    //   return <FDSProfilePhotoForActor {...profilePhotoForActorProps} />;
    case "contained-icon":
      // eslint-disable-next-line no-case-declarations
      const { color = "gray", ...containedIconProps } = addOnStart;
      return (
        <FDSSkittleIcon
          color={color}
          {...containedIconProps}
          disabled={disabled}
        />
      );
    case "contained-progress-ring-indeterminate":
      return (
        <FDSProgressSkittleIndeterminate
          aria-label={ARIA_LABEL_PLACEHOLDER_FIXME}
        />
      );
    case "messenger-facepile":
      // eslint-disable-next-line no-case-declarations
      const messengerFacepileProps = { ...addOnStart };
      return <MWJewelThreadFacepile {...messengerFacepileProps} />;
    case "override":
      return addOnStart.component;
    case "emoji":
      // eslint-disable-next-line no-case-declarations
      const {
        color: emojiColor = "gray",
        emoji,
        emojiSize = 20,
        size = 40,
      } = addOnStart;
      return (
        <FDSSkittleEmoji
          color={emojiColor}
          emoji={emoji}
          emojiSize={emojiSize}
          size={size}
        />
      );
    case "sprite":
      return <CometImageFromIXValueRelayWrapper sprite={addOnStart.sprite} />;
    default:
      return null;
  }
};

CometListCellStrictAddOnStart.displayName = `${CometListCellStrictAddOnStart.name} [from ${module.id}]`;

export default CometListCellStrictAddOnStart;
