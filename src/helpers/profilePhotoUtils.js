/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Locale from "./Locale";
import memoizeWithArgs from "./memoizeWithArgs";

const getBadgePosition = memoizeWithArgs(
  (size, isTopEnd = false) => {
    const offset = Math.round(
      Math.sqrt((Math.sqrt(2 * size * size) - size) ** 2 / 2)
    );
    if (isTopEnd) {
      return Locale.isRTL()
        ? { left: offset, top: offset, transform: "translate(-50%, -50%)" }
        : { right: offset, top: offset, transform: "translate(50%, -50%)" };
    } else {
      return Locale.isRTL()
        ? { bottom: offset, left: offset, transform: "translate(-50%, 50%)" }
        : { bottom: offset, right: offset, transform: "translate(50%, 50%)" };
    }
  },
  (size, isTopEnd) => `${isTopEnd}${size}`
);

const getStoryRingSize = memoizeWithArgs(
  (size) => {
    switch (size) {
      case 24:
      case 32:
      case 36:
      case 40:
        return 2;
      case 48:
      case 56:
      case 60:
        return 3;
      case 132:
      default:
        return 4;
    }
  },
  (size) => `${size}`
);

const getBadgeSizeAndStrokeWidth = memoizeWithArgs(
  // eslint-disable-next-line complexity
  (size, type) => {
    if (type === "availabilityBadge") {
      switch (size) {
        case 16:
        case 20:
        case 24:
          return [6, 1.5];
        case 28:
          return [7, 2];
        case 32:
        case 36:
          return [8, 2];
        case 40:
        case 44:
        case 48:
          return [9, 2];
        case 56:
        case 60:
          return [10, 2];
        case 72:
          return [12, 2];
        case 80:
        case 88:
          return [14, 2];
        case 96:
        case 100:
          return [15, 2];
        case 120:
        case 132:
        case 168:
          return [20, 4];
        default:
          return [8, 2];
      }
    }
    switch (size) {
      case 16:
      case 20:
      case 24:
        return [6, 1.5];
      case 28:
        return [7, 1.5];
      case 32:
        return [8, 2];
      case 36:
        return [9, 2];
      case 40:
        return [10, 2];
      case 44:
      case 48:
        return [12, 2];
      case 56:
        return [14, 2];
      case 60:
        return [15, 2];
      case 72:
        return [18, 2];
      case 80:
        return [20, 4];
      case 88:
        return [22, 4];
      case 96:
      case 100:
        return [24, 4];
      case 120:
      case 132:
        return [32, 4];
      case 168:
        return [41, 4];
      default:
        return [8, 2];
    }
  },
  (size, type) => `${size}${type}`
);

export { getBadgePosition, getBadgeSizeAndStrokeWidth, getStoryRingSize };
