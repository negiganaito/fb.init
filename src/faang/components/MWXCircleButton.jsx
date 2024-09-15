/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useMemo } from "react";

import BaseTheme from "./BaseTheme";
import CometCircleButton from "./CometCircleButton"; // FDSCircleButton
import { mwxSvgIcon } from "./MWXSvgIcon";
import { MWXThreadThemeColor } from "./MWXThreadThemeColor";

const MWXCircleButton = forwardRef((props, ref) => {
  const { color, icon, size, ...rest } = props;

  const buttonColor = color instanceof MWXThreadThemeColor ? "primary" : color;

  const themeConfig = useMemo(() => {
    if (color instanceof MWXThreadThemeColor) {
      return {
        dark: { "primary-icon": color.color },
        light: { "primary-icon": color.color },
        type: "VARIABLES",
      };
    }
    return undefined;
  }, [color]);

  const iconComponent = icon instanceof mwxSvgIcon ? icon.component : icon;

  let buttonElement = null;

  if (CometCircleButton !== null) {
    buttonElement = (
      <CometCircleButton
        color={buttonColor}
        icon={iconComponent}
        size={size}
        {...rest}
        ref={ref}
      />
    );
  }

  if (themeConfig !== null) {
    buttonElement = <BaseTheme config={themeConfig}>{buttonElement}</BaseTheme>;
  }

  return buttonElement;
});

MWXCircleButton.displayName = `${MWXCircleButton.name} [from ${module.id}]`;

export default MWXCircleButton;
