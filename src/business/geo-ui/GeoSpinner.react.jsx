/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useRef } from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import LoadingMarker from "../../faang/components/LoadingMarker.react";
import geoMargin from "../helpers/geoMargin";
import useGeoTheme from "../hooks/useGeoTheme";

import GeoBaseText from "./GeoBaseText.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import GeoVisualCompletionAttributes from "./GeoVisualCompletionAttributes";

const SMALL_CIRCLE_RADIUS = 14.5;
const LARGE_CIRCLE_RADIUS = 22;
const SMALL_STROKE_WIDTH = 1.5;
const LARGE_STROKE_WIDTH = 2;

function GeoSpinner({
  center,
  "data-testid": dataTestId,
  description,
  label,
  shade = "dark",
  size = "large",
  xstyle,
}) {
  const ref = useRef(null);
  const isCentered = center !== null ? center : Boolean(label);
  const styles = getStyles({ isCentered });

  const [color, descriptionColor] =
    shade === "dark"
      ? ["heading", "headingDescription"]
      : ["inverted", "inverted"];

  return (
    <LoadingMarker nodeRef={ref}>
      <div
        {...GeoVisualCompletionAttributes.LOADING_STATE}
        className={stylex(styles, xstyle)}
        data-testid={dataTestId}
        ref={ref}
      >
        <span
          aria-busy={true}
          aria-valuetext={fbt._("Loading")}
          className="x3nfvp2 x1t137rt"
          role="progressbar"
        >
          <Spinner shade={shade} size={size} />
        </span>
        <div className="x193iq5w">
          {label && (
            <GeoBaseText
              color={color}
              display="truncate"
              size="header4"
              textAlign="center"
              weight="bold"
              whiteSpace="nowrap"
              xstyle={geoMargin.top12}
            >
              {label}
            </GeoBaseText>
          )}
          {description && (
            <GeoBaseText
              color={descriptionColor}
              display="truncate"
              size="valueDescription"
              textAlign="center"
              whiteSpace="nowrap"
              xstyle={geoMargin.top4}
            >
              {description}
            </GeoBaseText>
          )}
        </div>
      </div>
    </LoadingMarker>
  );
}

GeoSpinner.displayName = `${GeoSpinner.name}`;

const baseStyles = {
  root: {
    display: "x3nfvp2",
    justifyContent: "xl56j7k",
    alignItems: "x6s0dn4",
    flexDirection: "xdt5ytf",
    $$css: true,
  },
  fullSize: {
    boxSizing: "x9f619",
    height: "x5yr21d",
    width: "xh8yej3",
    $$css: true,
  },
};

function getStyles({ isCentered }) {
  const theme = useGeoTheme();
  const spacing = theme.selectSpacing;
  return [
    baseStyles.root,
    isCentered && baseStyles.fullSize,
    isCentered &&
      spacing({ bounds: "internal", context: "component", target: "coarse" }),
  ];
}

function Spinner({ shade, size }) {
  const theme = useGeoTheme();
  const strokeColor = theme.selectStrokeColor;
  const barColor = strokeColor({ shade, element: "bar" });
  const trackColor = strokeColor({ shade, element: "track" });

  const circleRadius =
    size === "small" ? SMALL_CIRCLE_RADIUS : LARGE_CIRCLE_RADIUS;
  const strokeWidth =
    size === "small" ? SMALL_STROKE_WIDTH : LARGE_STROKE_WIDTH;
  const viewBoxSize = circleRadius + strokeWidth;
  const halfStrokeWidth = strokeWidth / 2;
  const halfCircleRadius = circleRadius / 2;
  const halfViewBoxSize = viewBoxSize / 2;

  return (
    <svg
      className="x1ka1v4i x7v9bd0 x1esw782 xa4qsjk xxymvpz"
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={viewBoxSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={stylex(trackColor)}
        fill="none"
        height={circleRadius}
        rx={halfCircleRadius}
        strokeWidth={strokeWidth}
        width={circleRadius}
        x={halfStrokeWidth}
        y={halfStrokeWidth}
      />
      <path
        className={stylex(barColor)}
        d={getArcPath(
          halfViewBoxSize,
          halfViewBoxSize,
          halfCircleRadius,
          1.5 * Math.PI,
          (1.5 + 1.25) * Math.PI
        )}
        fill="none"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

Spinner.displayName = `${Spinner.name}`;

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

// eslint-disable-next-line max-params
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = degreesToRadians(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// eslint-disable-next-line max-params
function getArcPath(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, radiansToDegrees(endAngle));
  const end = polarToCartesian(x, y, radius, radiansToDegrees(startAngle));
  const arcSweep = endAngle - startAngle > Math.PI ? "1" : "0";

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}`,
  ].join(" ");
}

export default makeGeoComponent("GeoSpinner", GeoSpinner);
