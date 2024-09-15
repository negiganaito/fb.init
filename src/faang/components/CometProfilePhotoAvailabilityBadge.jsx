/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import ARIA_LABEL_PLACEHOLDER_FIXME from "../../helpers/ARIA_LABEL_PLACEHOLDER_FIXME";

import BaseViewReact from "./BaseView.react";
import CometPressableChildrenWithOverlay from "./CometPressableChildrenWithOverlay";
import CometPressableOverlay from "./CometPressableOverlay.react";
import CometScreenReaderText from "./CometScreenReaderText";
import FDSBadge from "./FDSBadge";

const styles = {
  availabilityBadge: {
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    display: "x78zum5",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    position: "relative",
    ,
  },
};

const screenReaderText = fbt._("Active");

const CometProfilePhotoAvailabilityBadge = ({
  isDecorative = false,
  pressed,
  size,
}) => {
  return (
    <BaseViewReact aria-hidden={isDecorative} xstyle={styles.availabilityBadge}>
      <CometPressableChildrenWithOverlay
        overlay={<CometPressableOverlay pressed={pressed} radius="50%" />}
      >
        <FDSBadge
          accessibilityText={ARIA_LABEL_PLACEHOLDER_FIXME}
          color="green"
          isProfileBadge={true}
          size={size}
        />
      </CometPressableChildrenWithOverlay>
      <CometScreenReaderText text={screenReaderText} />
    </BaseViewReact>
  );
};

CometProfilePhotoAvailabilityBadge.displayName = `CometProfilePhotoAvailabilityBadge [from ${__filename}]`;

export default CometProfilePhotoAvailabilityBadge;
