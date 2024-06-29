/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import useStyleXTransitionSingle from "../../hooks/useStyleXTransitionSingle";
import useGeoPrivateLayerBehavior from "../hooks/useGeoPrivateLayerBehavior";
import useGeoTheme from "../hooks/useGeoTheme";

const DURATION_IN = 400;
const DURATION_OUT = 200;
const styles = {
  base: {
    transitionProperty: "x19991ni",
    transitionDuration: "xofcydl",
    opacity: "xg01cxk",
    $$css: true,
  },
  enter: { opacity: "x1hc1fzr", $$css: true },
  leave: {
    opacity: "xg01cxk",
    transitionDuration: "x13dflua",
    pointerEvents: "x47corl",
    $$css: true,
  },
};

const GeoBaseLayerFadeBehavior = ({ children, isShown }) => {
  const theme = useGeoTheme();
  const selectedTransition = theme.selectTransition({
    duration: "slow",
    timing: "soft",
  });

  const transitionStyle = useStyleXTransitionSingle(isShown ? children : null, {
    base: [selectedTransition, styles.base],
    enter: styles.enter,
    leave: styles.leave,
    durationIn: DURATION_IN,
    durationOut: DURATION_OUT,
  });

  const layerBehavior = useGeoPrivateLayerBehavior({
    xstyle: transitionStyle?.xstyle,
  });

  return layerBehavior(isShown ? children : null);
};

GeoBaseLayerFadeBehavior.displayName = `${GeoBaseLayerFadeBehavior.name} [from ${module.id}]`;

export default GeoBaseLayerFadeBehavior;
