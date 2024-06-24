/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "stylex";

import GeoBaseText from "./GeoBaseText.react";
import GeoDataText from "./GeoDataText.react";
import GeoHeading from "./GeoHeading.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import GeoText from "./GeoText.react";
import { getPairingTextProps, mapHeadingSizeToLevel } from "./GeoTextUtils";

const GeoTextPairingContent = ({ size, children, ...props }) => {
  switch (size) {
    case "value":
      return <GeoText {...props}>{children}</GeoText>;
    case "data":
      return <GeoDataText {...props}>{children}</GeoDataText>;
    case "header2":
    case "header3":
    case "header4":
      return (
        <GeoHeading level={mapHeadingSizeToLevel(size)} {...props}>
          {children}
        </GeoHeading>
      );
    default:
      return null;
  }
};

GeoTextPairingContent.displayName = `GeoTextPairingContent [from ${__filename}]`;

const GeoTextPairing = ({
  "data-description-testid": dataDescriptionTestId,
  "data-heading-testid": dataHeadingTestId,
  description,
  descriptionId,
  heading,
  headingId,
  overflowWrap,
  size,
  textAlign,
  truncate,
  xstyle,
  ...props
}) => {
  const headingDisplay =
    truncate === "heading" || truncate === "both" ? "truncate" : "block";
  const descriptionDisplay =
    truncate === "description" || truncate === "both" ? "truncate" : "block";

  return (
    <div className={stylex(styles.root, xstyle)}>
      <GeoTextPairingContent
        data-testid={dataHeadingTestId}
        display={headingDisplay}
        id={headingId}
        overflowWrap={overflowWrap}
        size={size}
        textAlign={textAlign}
        {...props}
      >
        {heading}
      </GeoTextPairingContent>
      {description !== null && description !== "" && (
        <GeoBaseText
          data-testid={dataDescriptionTestId}
          id={descriptionId}
          overflowWrap={overflowWrap}
          textAlign={textAlign}
          {...getPairingTextProps({ size, display: descriptionDisplay })}
        >
          {description}
        </GeoBaseText>
      )}
    </div>
  );
};

GeoTextPairing.displayName = `GeoTextPairing`;

const styles = {
  root: { minWidth: "xeuugli", $$css: true },
};

const GeoTextPairingComponent = makeGeoComponent(
  "GeoTextPairing",
  GeoTextPairing
);
export default GeoTextPairingComponent;
