// __d(
//   "GeoBaseLayerBlurBehavior.react",
//   ["react", "useGeoOnClickOutside", "useGeoPrivateLayerBehavior"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     h || (h = d("react"));
//     var i = h.useRef;
//     function a(a) {
//       var b = a.children,
//         d = a.context;
//       a = a.onBlur;
//       d = i((d = d) != null ? d : null);
//       var e = i(null),
//         f = c("useGeoPrivateLayerBehavior")({ ref: e });
//       c("useGeoOnClickOutside")(a, [d, e]);
//       return f(b);
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useRef } from "react";
import useGeoOnClickOutside from "useGeoOnClickOutside";
import useGeoPrivateLayerBehavior from "useGeoPrivateLayerBehavior";

interface GeoBaseLayerBlurBehaviorProps {
  children: React.ReactNode;
  context?: HTMLElement | null;
  onBlur: () => void;
}

const GeoBaseLayerBlurBehavior: React.FC<GeoBaseLayerBlurBehaviorProps> = ({
  children,
  context = null,
  onBlur,
}) => {
  const contextRef = useRef(context);
  const layerRef = useRef<HTMLElement | null>(null);
  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: layerRef });

  useGeoOnClickOutside(onBlur, [contextRef, layerRef]);

  return LayerBehavior(children);
};

GeoBaseLayerBlurBehavior.displayName = `${GeoBaseLayerBlurBehavior.name} [from ${module.id}]`;

export default GeoBaseLayerBlurBehavior;
