/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import GeoPrivateDisabledContext from "../contexts/GeoPrivateDisabledContext";
import geoMargin from "../helpers/geoMargin";

import GeoHeading from "./GeoHeading.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import GeoText from "./GeoText.react";

function GeoPopoverText({ children, containerRef, title, whiteSpace }) {
  return (
    <GeoPrivateDisabledContext.Provider value={false}>
      <div ref={containerRef}>
        {title !== null && (
          <GeoHeading
            level={4}
            textAlign="start"
            whiteSpace={whiteSpace}
            xstyle={geoMargin.top8}
          >
            {title}
          </GeoHeading>
        )}
        <GeoText display="block" textAlign="start" whiteSpace={whiteSpace}>
          {children}
        </GeoText>
      </div>
    </GeoPrivateDisabledContext.Provider>
  );
}

GeoPopoverText.displayName = `${GeoPopoverText.name}`;

export default makeGeoComponent("GeoPopoverText", GeoPopoverText);
