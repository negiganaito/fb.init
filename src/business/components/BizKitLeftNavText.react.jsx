/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import stylex from "@stylexjs/stylex";

import BizKitRouteContext from "../contexts/BizKitRouteContext";
import { getAriaLevelForSize, isHeader } from "../geo-ui/GeoTextUtils";
import useGeoPrivateTextStyle from "../hooks/useGeoPrivateTextStyle";

function determineElementType(display) {
  switch (display) {
    case "block":
    case "truncate":
      return "div";
    default:
      return "span";
  }
}

const BizKitLeftNavText = ({ children, display, size, weight }) => {
  const ElementType = determineElementType(display);
  const { isMultiAssetSelectionEnabled } = useContext(BizKitRouteContext);
  const colorRole = isMultiAssetSelectionEnabled ? "heading" : "value";

  const textStyle = useGeoPrivateTextStyle({
    color: colorRole,
    display,
    isDisabled: false,
    overflowWrap: "normal",
    size,
    textAlign: "inherit",
    weight,
    whiteSpace: "inherit",
  });

  return (
    <ElementType
      aria-level={getAriaLevelForSize(size)}
      className={stylex(textStyle)}
      role={isHeader(size) ? "heading" : undefined}
      style={{ color: "inherit" }}
    >
      {children}
    </ElementType>
  );
};

BizKitLeftNavText.displayName = `${BizKitLeftNavText.name}`;

export default BizKitLeftNavText;
