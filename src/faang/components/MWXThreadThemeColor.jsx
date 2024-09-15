/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class MWXThreadThemeColor {
  constructor(color) {
    this.color = color;
  }
}

function createMWXThreadThemeColor(color) {
  return new MWXThreadThemeColor(color);
}

export { createMWXThreadThemeColor, MWXThreadThemeColor };
