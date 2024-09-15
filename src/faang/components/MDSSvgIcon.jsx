/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometSVGIcon from "./CometSVGIcon";

const MDSSvgIcon = ({
  children,
  color,
  dataTestId,
  inline = false,
  size = 24,
  viewBox = "0 0 36 36",
}) => {
  return (
    <CometSVGIcon
      color={color}
      data-testid={dataTestId}
      inline={inline}
      size={size}
      viewBox={viewBox}
    >
      {children}
    </CometSVGIcon>
  );
};

MDSSvgIcon.displayName = `MDSSvgIcon`;

export default MDSSvgIcon;
