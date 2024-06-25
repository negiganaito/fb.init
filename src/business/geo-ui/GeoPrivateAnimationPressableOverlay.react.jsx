__d(
  "GeoPrivateAnimationPressableOverlay.react",
  ["GeoPrivateMakeComponent", "react", "stylex", "useGeoTheme"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || d("react");
    function a(a) {
      var b = a.color,
        d = a.isActive,
        e = a.isFocused;
      a = a.xstyle;
      b = l({ color: b, isFocused: e, isActive: d });
      return j.jsx("div", {
        className: (h || (h = c("stylex")))([b, a]),
        style: { margin: 0 },
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var k = {
      root: {
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
        $$css: !0,
      },
    };
    function l(a) {
      var b = a.color,
        d = a.isFocused;
      d = d === void 0 ? !1 : d;
      a = a.isActive;
      a = a === void 0 ? !1 : a;
      var e = c("useGeoTheme")(),
        f = e.selectTransition;
      e = e.selectInteractiveOverlay;
      e = e({ color: b, isFocused: d, isActive: a });
      return [
        f({ duration: a ? "extraShort" : "extraExtraShort", timing: "fade" }),
        e,
        k.root,
      ];
    }
    b = d("GeoPrivateMakeComponent").makeGeoComponent(
      "GeoPrivateAnimationPressableOverlay",
      a
    );
    g["default"] = b;
  },
  98
);

import { makeGeoComponent } from "GeoPrivateMakeComponent";
import React from "react";
import stylex from "stylex";
import { useGeoTheme } from "useGeoTheme";

interface AnimationPressableOverlayProps {
  color: string;
  isActive?: boolean;
  isFocused?: boolean;
  xstyle?: any;
}

const GeoPrivateAnimationPressableOverlay: React.FC<
  AnimationPressableOverlayProps
> = ({ color, isActive = false, isFocused = false, xstyle }) => {
  const theme = useGeoTheme();
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

function getStyles({
  color,
  isFocused,
  isActive,
}: {
  color: string;
  isFocused: boolean;
  isActive: boolean;
}) {
  const theme = useGeoTheme();
  const transition = theme.selectTransition({
    duration: isActive ? "extraShort" : "extraExtraShort",
    timing: "fade",
  });
  const interactiveOverlay = theme.selectInteractiveOverlay({
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
