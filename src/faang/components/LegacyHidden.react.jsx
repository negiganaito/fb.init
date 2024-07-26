/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, unstable_LegacyHidden } from "react";

const LegacyHidden = forwardRef((props, ref) => {
  const { children, htmlAttributes, mode, suppressHydrationWarning } = props;
  const LegacyHiddenComponent = unstable_LegacyHidden;

  return (
    <div
      {...htmlAttributes}
      hidden={mode === "hidden" ? true : undefined}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      <LegacyHiddenComponent
        mode={mode === "hidden" ? "unstable-defer-without-hiding" : mode}
      >
        {children}
      </LegacyHiddenComponent>
    </div>
  );
});

LegacyHidden.displayName = "LegacyHidden";

export default LegacyHidden;
