/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";
import FDSImageCover from "FDSImageCover.react";
import getLSMediaContactProfilePictureUrl from "getLSMediaContactProfilePictureUrl";
import LSContactBitOffset from "LSContactBitOffset";
import MWPContactContext from "MWPContactContext.react";
import MWPreloadableQueries from "MWPreloadableQueries";
import MWV2MessageProfilePhotoMenu from "MWV2MessageProfilePhotoMenu.entrypoint";
import MWXEntryPointPopoverTrigger from "MWXEntryPointPopoverTrigger.react";
import MWXIconAccount from "MWXIconAccount";
import MWXIconStrict from "MWXIconStrict.react";
import QE2Logger from "QE2Logger";
import qex from "qex";

import { to_string, zero } from "../../helpers/I64";
import useReStore from "../../hooks/useReStore";

import MWCMIsAnyCMThread from "./MWCMIsAnyCMThread";
import { useThread } from "./MWLSThread";
import { useActor } from "./MWPActor.react";
import MWXGlimmer from "./MWXGlimmer";
import MWXPressable from "./MWXPressable";
import MWXTooltip from "./MWXTooltip";
import { useFirst } from "./ReQLSuspense";

const styles = {
  glimmer: {
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    height: "x5yr21d",
    width: "xh8yej3",
    ,
  },
  profile: {
    alignItems: "xuk3077",
    display: "x78zum5",
    flexShrink: "x2lah0s",
    height: "x1fgtraw",
    maxWidth: "x193iq5w",
    width: "xgd8bvy",
    ,
  },
};

const MWV2MessageProfilePhotoContent = ({
  ariaHidden = false,
  isGroupThread,
  message,
}) => {
  const { contact, nickname } = MWPContactContext.useMWPContactStableContext();
  const actor = useActor();
  const store = useReStore();
  const thread = useThread(message.threadKey);
  const parentThreadKey = thread?.parentThreadKey;
  const threadType = thread?.threadType;
  const communityFolderQuery = useFirst(
    () =>
      MWPreloadableQueries.getCommunityFolderQuery(
        store,
        parentThreadKey ?? zero
      ).map((a) => a.fbGroupId),
    [store, parentThreadKey],
    `${MWV2MessageProfilePhotoContent.displayName}:72`
  );
  const isAnyCMThread = threadType ? MWCMIsAnyCMThread(threadType) : false;

  let profilePhotoContent;
  if (message.takedownState !== null) {
    profilePhotoContent = (
      <MWXTooltip
        align="middle"
        position="start"
        tooltip={fbt._("__JHASH__G4Bi2CYTkJR__JHASH__")}
      >
        <MWXIconStrict
          alt={fbt._("__JHASH__G4Bi2CYTkJR__JHASH__")}
          color="secondary"
          icon={MWXIconAccount}
          size={28}
        />
      </MWXTooltip>
    );
  } else if (
    contact !== null &&
    getLSMediaContactProfilePictureUrl(contact) !== ""
  ) {
    const tooltipText = nickname
      ? `${nickname} (${contact.name})`
      : contact.name;
    const hasBitOffset77 = LSContactBitOffset.has(77, contact) ?? false;
    const hasBitOffset84 = LSContactBitOffset.has(84, contact) ?? false;
    const showPopover =
      !hasBitOffset84 &&
      !hasBitOffset77 &&
      isAnyCMThread &&
      qex._("20") === true;
    const imageCover = (
      <FDSImageCover
        alt={contact.name}
        src={getLSMediaContactProfilePictureUrl(contact)}
        style={{ borderRadius: "50%" }}
      />
    );

    profilePhotoContent = (
      <MWXTooltip
        align="middle"
        onVisibilityChange={(visible) => {
          if (visible && isAnyCMThread) {
            QE2Logger.logExposureForUser(
              "cm_web_group_message_profile_photo_menu"
            );
          }
        }}
        position="start"
        tooltip={tooltipText}
      >
        {showPopover ? (
          <MWXEntryPointPopoverTrigger
            entryPointParams={{
              groupID: to_string(communityFolderQuery ?? zero),
              userID: to_string(actor),
            }}
            otherProps={{ isGroupThread, message }}
            popoverEntryPoint={MWV2MessageProfilePhotoMenu}
            position="above"
          >
            {(
              ref,
              onPress,
              _overlayRadius,
              onHoverIn,
              onHoverOut,
              onPressIn
            ) => (
              <MWXPressable
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={() => {
                  if (isAnyCMThread) {
                    QE2Logger.logExposureForUser(
                      "cm_web_group_message_profile_photo_menu"
                    );
                  }
                  onPress();
                }}
                onPressIn={onPressIn}
                overlayRadius="50%"
                ref={ref}
                xstyle={styles.profile}
              >
                {imageCover}
              </MWXPressable>
            )}
          </MWXEntryPointPopoverTrigger>
        ) : (
          imageCover
        )}
      </MWXTooltip>
    );
  } else {
    profilePhotoContent = <MWXGlimmer index={1} xstyle={styles.glimmer} />;
  }

  return (
    <div
      aria-hidden={ariaHidden}
      className="xuk3077 x78zum5 x2lah0s x1fgtraw x193iq5w xgd8bvy"
    >
      {profilePhotoContent}
    </div>
  );
};

MWV2MessageProfilePhotoContent.displayName = `MWV2MessageProfilePhotoContent [from ${MWV2MessageProfilePhotoContent.displayName}]`;

export default MWV2MessageProfilePhotoContent;
