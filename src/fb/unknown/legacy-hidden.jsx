/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable camelcase */
import React, {
  forwardRef,
  unstable_LegacyHidden as Unstable_LegacyHidden,
  unstable_Offscreen as Unstable_Offscreen,
} from "react";

const LegacyHidden = forwardRef(
  ({ htmlAttributes, mode, children, suppressHydrationWarning }, ref) => {
    return (
      <div
        {...htmlAttributes}
        hidden={mode === "hidden" ? true : undefined}
        ref={ref}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Unstable_LegacyHidden
          mode={mode === "hidden" ? "unstable-defer-without-hiding" : mode}
        >
          {children}
        </Unstable_LegacyHidden>
      </div>
    );
  }
);

const LegacyHiddenOffscreen = forwardRef(
  ({ htmlAttributes, mode, children, suppressHydrationWarning }, ref) => {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
      <Unstable_Offscreen mode={mode}>
        <div
          {...htmlAttributes}
          ref={ref}
          suppressHydrationWarning={suppressHydrationWarning}
        >
          {children}
        </div>
      </Unstable_Offscreen>
    );
  }
);

LegacyHidden.displayName = "LegacyHidden";
LegacyHiddenOffscreen.displayName = "LegacyHiddenOffscreen";

export { LegacyHidden, LegacyHiddenOffscreen };
