/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

const CometPressableOverlayContainer = ({
  children,
  role,
  style,
  xstyle,
  ...rest
}) => {
  return (
    <div className={stylex(xstyle)} role={role} style={style} {...rest}>
      {children}
    </div>
  );
};

CometPressableOverlayContainer.displayName = `${CometPressableOverlayContainer.name}`;

export default CometPressableOverlayContainer;
