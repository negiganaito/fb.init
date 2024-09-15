/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import useCurrentDisplayMode from "../../hooks/useCurrentDisplayMode";

import BaseTheme from "./BaseTheme";
import BaseViewReact from "./BaseView.react";

const config = {
  dark: "__fb-dark-mode ",
  light: "__fb-light-mode ",
  type: "CLASSNAMES",
};

const BaseToastContentWrapper = forwardRef((props, ref) => {
  const { children, testid, useInvertedDisplayMode, xstyle } = props;

  const currentDisplayMode = useCurrentDisplayMode();
  const invertedDisplayMode = currentDisplayMode === "dark" ? "light" : "dark";

  return useInvertedDisplayMode ? (
    <BaseTheme
      config={config}
      displayMode={invertedDisplayMode}
      ref={ref}
      testid={testid}
      xstyle={xstyle}
    >
      {children}
    </BaseTheme>
  ) : (
    <BaseViewReact ref={ref} testid={testid} xstyle={xstyle}>
      {children}
    </BaseViewReact>
  );
});

BaseToastContentWrapper.displayName = `${BaseToastContentWrapper.name}`;

export default BaseToastContentWrapper;
