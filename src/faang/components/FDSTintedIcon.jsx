/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import stylex from "@stylexjs/stylex";

import TintableIconSource from "../../helpers/TintableIconSource";

import BaseImage_DEPRECATED from "./BaseImage_DEPRECATED";

const styles = {
  image: { verticalAlign: "x1b0d499" },
  accent: { filter: "xi3auck" },
  blueLink: { filter: "x1vv9jnp" },
  disabled: { filter: "xmgbrsx" },
  negative: { filter: "x1d2xfc3" },
  placeholder: { filter: "xuo83w3" },
  positive: { filter: "x1hq76kk" },
  primary: { filter: "xep6ejk" },
  primaryAccent: { filter: "xq8hly8" },
  secondary: { filter: "x1d69dk1" },
  warning: { filter: "xgzi2j0" },
  white: { filter: "xaj1gnb" },
};

const FDSTintedIcon = forwardRef((props, ref) => {
  const {
    alt = "",
    color = "black",
    draggable,
    icon,
    id,
    testid,
    xstyle,
  } = props;

  const isTintableIcon = icon instanceof TintableIconSource;

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <BaseImage_DEPRECATED
      alt={alt}
      className={stylex(
        styles.image,
        isTintableIcon && color !== "black" && styles[color],
        xstyle
      )}
      draggable={draggable}
      id={id}
      ref={ref}
      src={icon.src}
      testid={testid}
    />
  );
});

FDSTintedIcon.displayName = `${FDSTintedIcon.name}`;

export default FDSTintedIcon;
