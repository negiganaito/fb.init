__d(
  "GeoPrivateAnimationLayerContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = { isAnimated: !1, isLeaving: !1, isEntered: !1 };
    c = a.createContext(b);
    g["default"] = c;
  },
  98
);

import React from "react";

interface GeoPrivateAnimationLayerContextProps {
  isAnimated: boolean;
  isLeaving: boolean;
  isEntered: boolean;
}

const defaultContextValue: GeoPrivateAnimationLayerContextProps = {
  isAnimated: false,
  isLeaving: false,
  isEntered: false,
};

const GeoPrivateAnimationLayerContext =
  React.createContext<GeoPrivateAnimationLayerContextProps>(
    defaultContextValue
  );

export default GeoPrivateAnimationLayerContext;
