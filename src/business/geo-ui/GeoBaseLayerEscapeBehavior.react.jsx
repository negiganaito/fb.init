// __d(
//   "GeoBaseLayerEscapeBehavior.react",
//   ["react", "useGeoPrivateLayerBehavior", "useGeoPrivateOnEscape"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     h || d("react");
//     function a(a) {
//       var b = a.children,
//         d = a.contain;
//       d = d === void 0 ? !1 : d;
//       a = a.onEscape;
//       a = c("useGeoPrivateOnEscape")(a, { contain: d });
//       d = c("useGeoPrivateLayerBehavior")({ ref: a });
//       return d(b);
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import useGeoPrivateLayerBehavior from "useGeoPrivateLayerBehavior";
import useGeoPrivateOnEscape from "useGeoPrivateOnEscape";

interface GeoBaseLayerEscapeBehaviorProps {
  children: React.ReactNode;
  contain?: boolean;
  onEscape: () => void;
}

const GeoBaseLayerEscapeBehavior: React.FC<GeoBaseLayerEscapeBehaviorProps> = ({
  children,
  contain = false,
  onEscape,
}) => {
  const escapeRef = useGeoPrivateOnEscape(onEscape, { contain });
  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: escapeRef });

  return LayerBehavior(children);
};

GeoBaseLayerEscapeBehavior.displayName = `${GeoBaseLayerEscapeBehavior.name}`;

export default GeoBaseLayerEscapeBehavior;
