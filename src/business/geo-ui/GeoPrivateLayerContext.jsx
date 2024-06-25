__d(
  "GeoPrivateLayerContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({ ref: void 0, xstyle: null });
    c = b;
    g["default"] = c;
  },
  98
);

import React from "react";

interface GeoPrivateLayerContextProps {
  ref?: React.Ref<HTMLElement>;
  xstyle?: any;
}

const GeoPrivateLayerContext = React.createContext<GeoPrivateLayerContextProps>(
  { ref: undefined, xstyle: null }
);

export default GeoPrivateLayerContext;
