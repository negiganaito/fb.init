/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import useGeoPrivateTextStyle from "../hooks/useGeoPrivateTextStyle";

const ZERO_WIDTH_SPACE = "\u200b";

const styles = {
  root: {
    display: "x78zum5",
    justifyContent: "xl56j7k",
    alignItems: "x6s0dn4",
    $$css: true,
  },
};

const defaultTextStyle = {
  color: "value",
  display: "block",
  overflowWrap: "normal",
  textAlign: "inherit",
  whiteSpace: "inherit",
  weight: "normal",
};

const GeoBaseLineHeightAlign = ({
  size = "value",
  xstyle,
  children,
  ...props
}) => {
  const textStyle = useGeoPrivateTextStyle({
    ...defaultTextStyle,
    size,
  });

  return (
    <div className={stylex([textStyle, styles.root, xstyle])} {...props}>
      <span>{ZERO_WIDTH_SPACE}</span>
      <div className="xjm9jq1 x78zum5 xl56j7k x6s0dn4">{children}</div>
    </div>
  );
};

GeoBaseLineHeightAlign.displayName = `GeoBaseLineHeightAlign [from ${__filename}]`;

export default GeoBaseLineHeightAlign;
