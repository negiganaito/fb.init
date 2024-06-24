/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  transitionDurationStyles,
  transitionTimingStyles,
} from "./GeoPrivateDefaultTransitionGeneratedStyles";

const properties = { transitionProperty: "x6o7n8i", $$css: true };
const root = {
  "@media (prefers-reduced-motion: reduce)_transitionDuration": "x12w9bfk",
  $$css: true,
};

function selectTransition({ duration, timing }) {
  const adjustedDuration = duration === "extraShort" ? "fast" : duration;
  return [
    transitionDurationStyles[adjustedDuration],
    properties,
    transitionTimingStyles[timing],
    root,
  ];
}

export { selectTransition };
