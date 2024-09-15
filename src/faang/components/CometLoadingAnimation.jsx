/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import stylex from "../../helpers/stylex";

const SIZE_36 = 38;
const SIZE_60 = 62;
const SIZE_40 = 42;
const STROKE_WIDTH_36 = 2;
const STROKE_WIDTH_40 = 3;
const STROKE_WIDTH_60 = 4;
const RADIUS_36 = SIZE_36 / 2;
const RADIUS_60 = SIZE_60 / 2;
const RADIUS_40 = SIZE_40 / 2;
const CIRCLE_RADIUS_36 = RADIUS_36 - 2;
const CIRCLE_RADIUS_60 = RADIUS_60 - 2;
const CIRCLE_RADIUS_40 = RADIUS_40 - 2;

const styles = {
  animationCircleWrapper: {
    animationDuration: "4s",
    animationIterationCount: "infinite",
    animationName: "x1uh2x5g-B",
    animationTimingFunction: "linear",
    transformOrigin: "50% 50%",
  },
  animationPaused: {
    animationPlayState: "paused",
  },
  animationRoot: {
    position: "absolute",
  },
  animationRootSize36: {
    start: "-3px",
    top: "-3px",
  },
  animationRootSize40: {
    start: "-3px",
    top: "-3px",
  },
  animationRootSize60: {
    start: "-3px",
    top: "-3px",
  },
  animationUploadingCircle: {
    animationDirection: "reverse",
    animationDuration: "16s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    transformOrigin: "50% 50%",
  },
  animationUploadingCircleSize36: {
    animationDirection: "reverse",
    animationDuration: "4s",
    animationIterationCount: "infinite",
    animationName: "x1k1ooqk-B",
    animationTimingFunction: "linear",
    strokeWidth: "2",
  },
  animationUploadingCircleSize40: {
    animationDirection: "reverse",
    animationDuration: "4s",
    animationIterationCount: "infinite",
    animationName: "xh7ukb3-B",
    animationTimingFunction: "linear",
    strokeWidth: "3",
  },
  animationUploadingCircleSize60: {
    animationDirection: "reverse",
    animationDuration: "4s",
    animationIterationCount: "infinite",
    animationName: "x1acst8a-B",
    animationTimingFunction: "linear",
    strokeWidth: "4",
  },
};

const CometLoadingAnimation = ({ animationPaused = false, size }) => {
  let svgSize;
  let radius;
  let circleRadius;

  switch (size) {
    case 36:
      svgSize = SIZE_36;
      radius = RADIUS_36;
      circleRadius = CIRCLE_RADIUS_36;
      break;
    case 40:
      svgSize = SIZE_40;
      radius = RADIUS_40;
      circleRadius = CIRCLE_RADIUS_40;
      break;
    case 60:
    default:
      svgSize = SIZE_60;
      radius = RADIUS_60;
      circleRadius = CIRCLE_RADIUS_60;
      break;
  }

  return (
    <svg
      className={stylex(
        styles.animationRoot,
        size === 36 && styles.animationRootSize36,
        size === 60 && styles.animationRootSize60,
        size === 40 && styles.animationRootSize40
      )}
      height={svgSize}
      width={svgSize}
    >
      <g
        className={stylex(
          styles.animationCircleWrapper,
          animationPaused && styles.animationPaused
        )}
      >
        <circle
          className={stylex(
            styles.animationUploadingCircle,
            size === 36 && styles.animationUploadingCircleSize36,
            size === 40 && styles.animationUploadingCircleSize40,
            size === 60 && styles.animationUploadingCircleSize60,
            animationPaused && styles.animationPaused
          )}
          cx={radius}
          cy={radius}
          fill="none"
          r={circleRadius}
          stroke="#1877F2"
          strokeWidth={
            size === 36
              ? STROKE_WIDTH_36
              : size === 40
              ? STROKE_WIDTH_40
              : STROKE_WIDTH_60
          }
        />
      </g>
    </svg>
  );
};

CometLoadingAnimation.displayName = `CometLoadingAnimation [from ${module.id}]`;

export default CometLoadingAnimation;
