__d(
  "GeoPrivateBaseHintContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({ isSticky: !1 });
    c = b;
    g["default"] = c;
  },
  98
);

import React from "react";

interface GeoPrivateBaseHintContextProps {
  isSticky: boolean;
  popoverType?: string; // Assuming popoverType might be part of the context based on previous modules
}

const GeoPrivateBaseHintContext =
  React.createContext<GeoPrivateBaseHintContextProps>({ isSticky: false });

export default GeoPrivateBaseHintContext;
