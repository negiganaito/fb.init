/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import fbicon from "../helpers/fbicon";
import ix from "../helpers/ix";
import useGeoPrivateIsNextTheme from "../hooks/useGeoPrivateIsNextTheme";

import GeoPrivateBaseButton from "./GeoPrivateBaseButton.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoCloseButton = ({
  label = fbt._("Close"),
  isDisabled = false,
  ...props
}) => {
  const isNextTheme = useGeoPrivateIsNextTheme();
  const icon = isNextTheme
    ? fbicon(ix("478237"), 16)
    : fbicon(ix("478232"), 16);

  return (
    <GeoPrivateBaseButton
      icon={icon}
      isDisabled={isDisabled}
      isLabelHidden={true}
      label={label}
      loggingName="GeoCloseButton"
      variant="flat"
      {...props}
    />
  );
};

GeoCloseButton.displayName = `GeoCloseButton [from ${__filename}]`;

const GeoCloseButtonComponent = makeGeoComponent(
  "GeoCloseButton",
  GeoCloseButton
);
export default GeoCloseButtonComponent;
