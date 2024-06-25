/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import coerceImageishSprited from "./coerceImageishSprited";
import memoizeWithArgs from "./memoizeWithArgs";
import TintableIconSource from "./TintableIconSource";

export const filled = (name, size) => {
  throw console.log(
    `fbicon.filled(${JSON.stringify(
      name
    )}, ${size}): Unexpected fbicon.filled reference.`,
    "comet_ui"
  );
};

export const outline = (name, size) => {
  throw console.log(
    `fbicon.outline(${JSON.stringify(
      name
    )}, ${size}): Unexpected fbicon.outline reference.`,
    "comet_ui"
  );
};

const memoizedGetIcon = memoizeWithArgs(
  (name, size) => {
    return new TintableIconSource("FB", name, size);
  },
  (name, size) => {
    if (typeof name === "object") {
      const sprited = coerceImageishSprited(name);
      if (sprited !== null) {
        return `${sprited.identifier}:${size}`;
      } else if (typeof name.uri === "string") {
        return `${name.uri}:${size}`;
      }
    } else if (typeof name === "string") {
      return `${name}:${size}`;
    }

    throw console.log("fbicon._: Invalid icon provided.", "comet_ui");
  }
);

export default memoizedGetIcon;
