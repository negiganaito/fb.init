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
import React from "react";
import stylex from "@stylexjs/stylex";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { useGeoTheme } from "useGeoTheme";

const GeoPrivateAnimationPressableOverlay = ({
  color,
  isActive = false,
  isFocused = false,
  xstyle,
}) => {
  const styles = getStyles({ color, isFocused, isActive });

  return <div className={stylex([styles, xstyle])} style={{ margin: 0 }} />;
};

GeoPrivateAnimationPressableOverlay.displayName = `GeoPrivateAnimationPressableOverlay [from ${module.id}]`;

const rootStyles = {
  borderTopStartRadius: "x1o1ewxj",
  borderTopEndRadius: "x3x9cwd",
  borderBottomEndRadius: "x1e5q0jg",
  borderBottomStartRadius: "x13rtm0m",
  bottom: "x1ey2m1c",
  end: "xds687c",
  left: null,
  right: null,
  pointerEvents: "x47corl",
  position: "x10l6tqk",
  start: "x17qophe",
  top: "x13vifvy",
  zIndex: "x8knxv4",
  $$css: true,
};

function getStyles({ color, isFocused, isActive }) {
  const theme = useGeoTheme();
  const { selectTransition, selectInteractiveOverlay } = theme;
  const transition = selectTransition({
    duration: isActive ? "extraShort" : "extraExtraShort",
    timing: "fade",
  });
  const interactiveOverlay = selectInteractiveOverlay({
    color,
    isFocused,
    isActive,
  });

  return [transition, interactiveOverlay, rootStyles];
}

export default makeGeoComponent(
  "GeoPrivateAnimationPressableOverlay",
  GeoPrivateAnimationPressableOverlay
);
