/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import CometProfilePhotoLastActiveTimeBadge from "CometProfilePhotoLastActiveTimeBadge.react";
import CometSSRReplaceContentOnHydrationAndBreakEventReplaying from "CometSSRReplaceContentOnHydrationAndBreakEventReplaying.react";

import {
  getBadgePosition,
  getBadgeSizeAndStrokeWidth,
} from "../../helpers/profilePhotoUtils";
import stylex from "../../helpers/stylex";
import unrecoverableViolation from "../../helpers/unrecoverableViolation";

import CometProfilePhotoAvailabilityBadge from "./CometProfilePhotoAvailabilityBadge";
import TetraProfilePhoto from "./TetraProfilePhoto";

const styles = {
  badge: {
    position: "x10l6tqk",
    ,
  },
  badgeWithLastActiveTime: {
    bottom: "x1ey2m1c",
    display: "x78zum5",
    end: "xds687c",
    start: "x17qophe",
    justifyContent: "x13a6bvl",
    ,
  },
  primaryPhoto: {
    bottom: "x1ey2m1c",
    start: "x17qophe",
    position: "x10l6tqk",
    ,
  },
  root: {
    position: "relative",
    ,
  },
  withCircleBorder: {
    borderTopColor: "x6zyg47",
    borderEndColor: "x1xm1mqw",
    borderBottomColor: "xpn8fn3",
    borderStartColor: "xtct9fg",
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    ,
  },
};

const sizeStyles = {
  24: { height: "xxk0z11", width: "xvy4d1p",  },
  36: { height: "xc9qbxq", width: "x14qfxbe",  },
  40: { height: "x1vqgdyp", width: "x100vrsf",  },
  48: { height: "xsdox4t", width: "x1useyqa",  },
  56: { height: "xnnlda6", width: "x15yg21f",  },
  60: { height: "xng8ra", width: "x1247r65",  },
  80: { height: "xwzfr38", width: "x1dmp6jm",  },
};

const getSecondaryPhotoSize = (size) => {
  switch (size) {
    case 24:
      return 16;
    case 36:
      return 24;
    case 40:
      return 28;
    case 48:
      return 32;
    case 56:
      return 36;
    case 60:
      return 40;
    case 80:
      return 56;
    default:
      throw unrecoverableViolation(
        "Invalid size passed to MWJewelThreadfacepile",
        "comet_ui"
      );
  }
};

const MWJewelThreadFacepile = ({
  addOn,
  primaryPhoto,
  secondaryPhoto,
  showAvailabilityBadge,
  size,
  unreadCount,
}) => {
  const secondaryPhotoSize = getSecondaryPhotoSize(size);
  const [badgeSize] = getBadgeSizeAndStrokeWidth(size, "availabilityBadge");
  const badgePosition = getBadgePosition(size / 2);
  const showLargeLastActiveTimeBadge =
    addOn?.type === "lastActiveTimeBadge" && size > 28;
  const { withBorder, ...primaryPhotoProps } = primaryPhoto;

  let badge = null;
  if (addOn?.type === "availabilityBadge") {
    badge = (
      <div className="x10l6tqk" style={badgePosition}>
        <CometProfilePhotoAvailabilityBadge pressed={false} size={badgeSize} />
      </div>
    );
  } else if (addOn?.type === "lastActiveTimeBadge") {
    badge = (
      <div
        className={stylex(
          styles.badge,
          showLargeLastActiveTimeBadge && styles.badgeWithLastActiveTime
        )}
        style={showLargeLastActiveTimeBadge ? undefined : badgePosition}
      >
        <CometProfilePhotoLastActiveTimeBadge
          border={addOn.border}
          pressed={false}
          time={addOn.time}
        />
      </div>
    );
  } else if (addOn?.type === "trigger") {
    badge = (
      <div className="x10l6tqk x1ey2m1c x78zum5 xds687c x17qophe x13a6bvl">
        {addOn.icon}
      </div>
    );
  }

  return (
    <div className={stylex(styles.root, sizeStyles[String(size)])}>
      <div className="xds687c x10l6tqk x13vifvy">
        <TetraProfilePhoto
          {...secondaryPhoto}
          shape="circle"
          size={secondaryPhotoSize}
        />
      </div>
      <div
        className={stylex(
          styles.primaryPhoto,
          withBorder === true && styles.withCircleBorder
        )}
      >
        <TetraProfilePhoto
          {...primaryPhotoProps}
          shape="circle"
          size={secondaryPhotoSize}
        />
      </div>
      <CometSSRReplaceContentOnHydrationAndBreakEventReplaying>
        {badge}
      </CometSSRReplaceContentOnHydrationAndBreakEventReplaying>
    </div>
  );
};

export default MWJewelThreadFacepile;
