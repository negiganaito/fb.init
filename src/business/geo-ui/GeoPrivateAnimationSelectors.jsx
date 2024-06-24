/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  animationDurationStyles,
  animationTimingStyles,
} from "./GeoPrivateDefaultAnimationGeneratedStyles";

const root = {
  root: {
    "@media (prefers-reduced-motion: reduce)_animationDuration": "x1u6grsq",
    $$css: true,
  },
};

function selectAnimation({ duration, timing }) {
  const durationKey = duration === "extraShort" ? "fast" : duration;
  return [
    animationDurationStyles[durationKey],
    animationTimingStyles[timing],
    root.root,
  ];
}

export { selectAnimation };
