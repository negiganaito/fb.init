/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import useGeoPrivateIsNextTheme from "../hooks/useGeoPrivateIsNextTheme";

import GeoPrivateIcon from "./GeoPrivateIcon";
import { getIcon, getNextIcon } from "./GeoPrivateStatusIconUtils";

function GeoStatusIcon({
  color = "default",
  "data-testid": dataTestId,
  size = 16,
  status,
  xstyle,
}) {
  const isNextTheme = useGeoPrivateIsNextTheme();
  const iconColor = color === "default" ? getStatusColor(status) : color;
  const icon = isNextTheme ? getNextIcon(status, size) : getIcon(status, size);

  return (
    <GeoPrivateIcon
      color={iconColor}
      data-testid={dataTestId}
      icon={icon}
      xstyle={xstyle}
    />
  );
}

GeoStatusIcon.displayName = `${GeoStatusIcon.name}`;

function getStatusColor(status) {
  switch (status) {
    case "info":
    case "progress":
      return "default";
    case "success":
      return "success";
    case "warning":
      return "warning";
    default:
      return "error";
  }
}

export default GeoStatusIcon;
