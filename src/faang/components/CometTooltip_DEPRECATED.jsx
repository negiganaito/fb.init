/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseTooltip from "./BaseTooltip";
import CometTooltipImpl from "./CometTooltipImpl";

const CometTooltip_DEPRECATED = ({
  delayMs,
  tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY,
  ...rest
}) => {
  return (
    <BaseTooltip
      {...rest}
      delayTooltipMs={delayMs}
      tooltipImpl={CometTooltipImpl}
      tooltipTheme={
        tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY
      }
    />
  );
};

CometTooltip_DEPRECATED.displayName = `CometTooltip_DEPRECATED [from ${__filename}]`;

export default CometTooltip_DEPRECATED;
