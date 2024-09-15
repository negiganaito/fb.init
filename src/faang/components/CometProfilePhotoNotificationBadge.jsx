/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import ARIA_LABEL_PLACEHOLDER_FIXME from "../../helpers/ARIA_LABEL_PLACEHOLDER_FIXME";

import FDSBadge from "./FDSBadge";
import FDSText from "./FDSText";

const CometProfilePhotoNotificationBadge = ({ number }) => {
  return (
    <FDSBadge
      accessibilityText={ARIA_LABEL_PLACEHOLDER_FIXME}
      color="red"
      isProfileBadge={true}
      size={18}
      wide={number > 9 ? "wide" : "normal"}
    >
      <div className="x6s0dn4 x78zum5 x5yr21d xl56j7k xuxw1ft xh8yej3">
        <FDSText color="primaryOnMedia" type="body4">
          {number > 9 ? "9+" : number}
        </FDSText>
      </div>
    </FDSBadge>
  );
};

CometProfilePhotoNotificationBadge.displayName = `${CometProfilePhotoNotificationBadge.name} [from ${module.id}]`;

export default CometProfilePhotoNotificationBadge;
