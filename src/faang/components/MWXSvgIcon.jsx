/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { SVGIcon } from "./SVGIcon";

function createSvgComponent(Component) {
  const SvgComponent = (props) => (
    <Component {...props} overflow="visible" viewBox="6 6 24 24" />
  );

  SvgComponent._isSVG = true;
  return SVGIcon(SvgComponent);
}

class MWXSvgIcon {
  constructor(originalComponent, isMenuItem) {
    this.originalComponent = originalComponent;
    this.isMenuItem = isMenuItem;
    this.component = isMenuItem
      ? createSvgComponent(originalComponent.component)
      : originalComponent;
  }

  asMenuItemIcon_ESCAPE_HATCH() {
    return new MWXSvgMenuItemIcon(this.originalComponent, this.isMenuItem);
  }
}

class MWXSvgMenuItemIcon extends MWXSvgIcon {}

export function mwxSvgIcon(originalComponent, isMenuItem) {
  return new MWXSvgIcon(originalComponent, isMenuItem);
}

export function mwxSvgMenuItemIcon(originalComponent, isMenuItem) {
  return new MWXSvgMenuItemIcon(originalComponent, isMenuItem);
}
