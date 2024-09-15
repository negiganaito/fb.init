/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import BaseThemeProvider from "./BaseThemeProvider";
import BaseViewReact from "./BaseView.react";

const BaseTheme = forwardRef((props, ref) => {
  const { config, displayMode, style, xstyle, ...rest } = props;

  return (
    <BaseThemeProvider config={config} displayMode={displayMode}>
      {(theme, dynamicStyles) => (
        <BaseViewReact
          {...rest}
          ref={ref}
          style={{ ...dynamicStyles, ...style }}
          xstyle={[theme, xstyle]}
        />
      )}
    </BaseThemeProvider>
  );
});

BaseTheme.displayName = `${BaseTheme.name}`;

export default BaseTheme;
