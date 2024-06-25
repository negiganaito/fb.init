/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import DangerouslyAccessReactElementInternals from "../../faang/components/DangerouslyAccessReactElementInternals";
import Image from "../../faang/components/Image.react";
import WebCSSTintedIcon from "../../faang/components/WebCSSTintedIcon.react";
import isTruthy from "../helpers/isTruthy";
import TintableIconSource from "../helpers/TintableIconSource";
import useGeoIconStyle from "../hooks/useGeoIconStyle";
import useGeoPrivateIsDisabled from "../hooks/useGeoPrivateIsDisabled";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const styles = {
  root: {
    display: "x3nfvp2",
    ":not([stylex-hack]) svg_fill": "x120ccyz",
    $$css: true,
  },
};

function GeoPrivateIcon({
  "data-testid": dataTestId,
  description,
  color,
  icon,
  isDisabled = false,
  xstyle,
}) {
  const disabled = useGeoPrivateIsDisabled(isDisabled);
  const iconStyle = useGeoIconStyle({
    color: color !== null ? color : "default",
    isDisabled: disabled,
  });

  let iconElement = null;
  if (icon instanceof TintableIconSource) {
    iconElement = (
      <WebCSSTintedIcon fallback={<Image src={icon.src} />} icon={icon} />
    );
  } else if (DangerouslyAccessReactElementInternals(icon).type === "svg") {
    iconElement = icon;
  }

  return (
    <div
      aria-label={description}
      className={stylex(styles.root, iconStyle, xstyle)}
      data-testid={dataTestId}
      role={isTruthy(description) ? "img" : "presentation"}
    >
      {iconElement}
    </div>
  );
}

GeoPrivateIcon.displayName = `${GeoPrivateIcon.name} `;

export default makeGeoComponent("GeoPrivateIcon", GeoPrivateIcon);
