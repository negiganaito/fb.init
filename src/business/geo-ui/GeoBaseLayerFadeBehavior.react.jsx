__d(
  "GeoBaseLayerFadeBehavior.react",
  [
    "react",
    "useGeoPrivateLayerBehavior",
    "useGeoTheme",
    "useStyleXTransitionSingle",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    h || d("react");
    var i = 400,
      j = 200,
      k = {
        base: {
          transitionProperty: "x19991ni",
          transitionDuration: "xofcydl",
          opacity: "xg01cxk",
          $$css: !0,
        },
        enter: { opacity: "x1hc1fzr", $$css: !0 },
        leave: {
          opacity: "xg01cxk",
          transitionDuration: "x13dflua",
          pointerEvents: "x47corl",
          $$css: !0,
        },
      };
    function a(a) {
      var b = a.children;
      a = a.isShown;
      var d = c("useGeoTheme")();
      d = d.selectTransition;
      d = d({ duration: "slow", timing: "soft" });
      a = c("useStyleXTransitionSingle")(a ? b : null, {
        base: [d, k.base],
        enter: k.enter,
        leave: k.leave,
        durationIn: i,
        durationOut: j,
      });
      d = c("useGeoPrivateLayerBehavior")({
        xstyle: a == null ? void 0 : a.xstyle,
      });
      a = a != null;
      return d(a ? b : null);
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React from "react";
import useGeoPrivateLayerBehavior from "useGeoPrivateLayerBehavior";
import useGeoTheme from "useGeoTheme";
import useStyleXTransitionSingle from "useStyleXTransitionSingle";

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

interface GeoBaseLayerFadeBehaviorProps {
  children: React.ReactNode;
  isShown: boolean;
}

const GeoBaseLayerFadeBehavior: React.FC<GeoBaseLayerFadeBehaviorProps> = ({
  children,
  isShown,
}) => {
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
