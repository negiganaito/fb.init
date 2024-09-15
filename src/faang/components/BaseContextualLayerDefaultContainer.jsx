/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import { stylex } from "@stylexjs/stylex";
import testID from "testID";

import LegacyHidden from "./LegacyHidden.react";

const BaseContextualLayerDefaultContainer = forwardRef(
  (
    {
      children,
      hidden,
      // presencePayload,
      stopClickPropagation,
      testid,
      xstyle,
    },
    ref
  ) => {
    return (
      <LegacyHidden
        htmlAttributes={{
          ...testID(testid),
          className: stylex(xstyle),
          onClick:
            stopClickPropagation === true
              ? (e) => e.stopPropagation()
              : undefined,
        }}
        mode={hidden ? "hidden" : "visible"}
        ref={ref}
      >
        {children}
      </LegacyHidden>
    );
  }
);

BaseContextualLayerDefaultContainer.displayName = `BaseContextualLayerDefaultContainer [from ${__filename}]`;

export default BaseContextualLayerDefaultContainer;
