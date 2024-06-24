/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "stylex";

import GeoPrivateInvertThemeContext from "../contexts/GeoPrivateInvertThemeContext";
import useGeoTheme from "../hooks/useGeoTheme";

import GeoBaseSpacingLayout from "./GeoBaseSpacingLayout.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoBaseToast = ({
  children,
  containerRef,
  "data-testid": dataTestId,
  status = "success",
  xstyle,
}) => {
  const styles = getStyles({ status });

  return (
    <GeoPrivateInvertThemeContext.Provider value={true}>
      <div
        aria-atomic="true"
        aria-live="polite"
        className={stylex(styles, xstyle)}
        data-testid={dataTestId}
        ref={containerRef}
        role="alert"
      >
        <GeoBaseSpacingLayout align="center" grow="fill">
          {children}
        </GeoBaseSpacingLayout>
      </div>
    </GeoPrivateInvertThemeContext.Provider>
  );
};

GeoBaseToast.displayName = `${GeoBaseToast.name} [from ${module.id}]`;

const getStyles = ({ status }) => {
  const theme = useGeoTheme();
  const { selectBorderRadius, selectSpacing, selectStaticBackgroundColor } =
    theme;

  return [
    status === "error"
      ? selectStaticBackgroundColor({ surface: "error" })
      : selectStaticBackgroundColor({ isInverted: true, surface: "content" }),
    selectBorderRadius({ context: "content" }),
    selectSpacing({
      context: "container",
      bounds: "internal",
      relation: "component",
    }),
  ];
};

export default makeGeoComponent("GeoBaseToast", GeoBaseToast);
