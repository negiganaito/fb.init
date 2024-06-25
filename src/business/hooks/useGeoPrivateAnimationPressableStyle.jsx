/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import useGeoTheme from "./useGeoTheme";

const styles = {
  animationStyles: {
    transitionProperty: "x15406qy",
    $$css: true,
  },
};

function useGeoPrivateAnimationPressableStyle({ hasAnimation, isActive }) {
  const theme = useGeoTheme();
  const transition = theme.selectTransition({
    duration: isActive ? "extraShort" : "extraExtraShort",
    timing: "fade",
  });

  return hasAnimation ? [transition, styles.animationStyles] : null;
}

export default useGeoPrivateAnimationPressableStyle;
