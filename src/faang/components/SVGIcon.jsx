/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class SVGIcon {
  constructor(component) {
    this.component = component;
  }
}

const svgIcon = (component) => new SVGIcon(component);

class EmojiIcon {
  constructor(codepoints, component) {
    this.codepoints = codepoints;
    this.component = component;
  }
}

class LegacySVGIcon {
  constructor(component) {
    this.component = component;
  }
}

const legacySVGIcon = (component) => new LegacySVGIcon(component);

export { EmojiIcon, LegacySVGIcon, legacySVGIcon, SVGIcon, svgIcon };
