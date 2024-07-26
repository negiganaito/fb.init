/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { stylex } from "@stylexjs/stylex";

import LegacyHidden from "./LegacyHidden.react";

const styles = stylex.create({
  hidden: {
    display: "none",
  },

  root: {
    boxSizing: "border-box",
    position: "relative",
    zIndex: 0,
  },
});

const baseViewReact = (props, ref) => {
  const { children, xstyle, suppressHydrationWarning, ...restProps } = props;

  const hidden = restProps.hidden === true;
  return (
    <LegacyHidden
      htmlAttributes={{
        ...restProps,
        className: stylex([styles.root, xstyle, hidden && styles.hidden]),
        mode: hidden ? "hidden" : "visible",
        ref,
        suppressHydrationWarning,
        children,
      }}
    />
  );
};

baseViewReact.displayName = `${baseViewReact.name} [from BaseView.react]`;

const BaseViewReact = React.forwardRef(baseViewReact);
export default BaseViewReact;
export { BaseViewReact };
