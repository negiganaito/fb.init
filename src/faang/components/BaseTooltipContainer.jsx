/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

const styles = {
  container: {
    backgroundColor: "xj5tmjb",
    borderTopStartRadius: "x1r9drvm",
    borderTopEndRadius: "x16aqbuh",
    borderBottomEndRadius: "x9rzwcf",
    borderBottomStartRadius: "xjkqk3g",
    boxShadow: "xms15q0",
    display: "x1lliihq",
    filter: "xo8ld3r",
    marginBottom: "xjpr12u",
    marginTop: "xr9ek0c",
    maxWidth: "x86nfjv",
    opacity: "xg01cxk",
    paddingStart: "x1ye3gou",
    paddingEnd: "xn6708d",
    paddingTop: "xz9dl7a",
    paddingBottom: "xsag5q8",
    position: "relative",
    transitionDuration: "x1ebt8du",
    transitionProperty: "x19991ni",
    transitionTimingFunction: "x1dhq9h",
    ,
  },
  containerVisible: {
    opacity: "x1hc1fzr",
    transitionDuration: "xhb22t3",
    transitionTimingFunction: "xls3em1",
    ,
  },
};

const BaseTooltipContainer = forwardRef(
  (
    { children, id, shouldFadeIn = false, xstyle, role = "tooltip", ...rest },
    ref
  ) => {
    return (
      <div
        {...rest}
        className={stylex(
          styles.container,
          xstyle,
          shouldFadeIn && styles.containerVisible
        )}
        data-testid={undefined}
        id={id}
        ref={ref}
        role={role}
      >
        {children}
      </div>
    );
  }
);

BaseTooltipContainer.displayName = `BaseTooltipContainer`;

export default BaseTooltipContainer;
