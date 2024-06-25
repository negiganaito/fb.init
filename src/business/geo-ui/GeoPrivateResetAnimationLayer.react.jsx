// __d(
//   "GeoPrivateResetAnimationLayer.react",
//   ["GeoPrivateAnimationLayerContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react"),
//       j = { isAnimated: !1, isLeaving: !1, isEntered: !1 };
//     function a(a) {
//       a = a.children;
//       return i.jsx(c("GeoPrivateAnimationLayerContext").Provider, {
//         value: j,
//         children: a,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import GeoPrivateAnimationLayerContext, {
  GeoPrivateAnimationLayerContextProps,
} from "GeoPrivateAnimationLayerContext";

const defaultContextValue: GeoPrivateAnimationLayerContextProps = {
  isAnimated: false,
  isLeaving: false,
  isEntered: false,
};

interface GeoPrivateResetAnimationLayerProps {
  children: React.ReactNode;
}

const GeoPrivateResetAnimationLayer: React.FC<
  GeoPrivateResetAnimationLayerProps
> = ({ children }) => {
  return (
    <GeoPrivateAnimationLayerContext.Provider value={defaultContextValue}>
      {children}
    </GeoPrivateAnimationLayerContext.Provider>
  );
};

GeoPrivateResetAnimationLayer.displayName = "GeoPrivateResetAnimationLayer";

export default GeoPrivateResetAnimationLayer;
