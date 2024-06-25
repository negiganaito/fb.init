// __d(
//   "GeoBaseLayerExitBehavior.react",
//   ["react", "useGeoPrivateLayerBehavior"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     h || (h = d("react"));
//     b = h;
//     var i = b.useCallback,
//       j = b.useRef;
//     function a(a) {
//       var b = a.children,
//         d = a.delay,
//         e = d === void 0 ? 0 : d,
//         f = a.onExit,
//         g = j(null),
//         h = i(function () {
//           window.clearTimeout(g.current);
//         }, []),
//         k = i(
//           function () {
//             g.current = window.setTimeout(f, e);
//           },
//           [e, f]
//         ),
//         l = j(null);
//       d = i(
//         function (a) {
//           l.current == null ? void 0 : l.current(),
//             (l.current = null),
//             a != null &&
//               (a.addEventListener("mouseenter", h),
//               a.addEventListener("mouseleave", k),
//               (l.current = function () {
//                 a.removeEventListener("mouseenter", h),
//                   a.removeEventListener("mouseleave", k);
//               }));
//         },
//         [h, k]
//       );
//       return c("useGeoPrivateLayerBehavior")({ ref: d })(b);
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback, useRef } from "react";
import useGeoPrivateLayerBehavior from "useGeoPrivateLayerBehavior";

interface GeoBaseLayerExitBehaviorProps {
  children: React.ReactNode;
  delay?: number;
  onExit: () => void;
}

const GeoBaseLayerExitBehavior: React.FC<GeoBaseLayerExitBehaviorProps> = ({
  children,
  delay = 0,
  onExit,
}) => {
  const timeoutRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const clearTimeoutCallback = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  const setTimeoutCallback = useCallback(() => {
    timeoutRef.current = window.setTimeout(onExit, delay);
  }, [delay, onExit]);

  const handleRef = useCallback(
    (node: HTMLElement | null) => {
      cleanupRef.current?.();
      cleanupRef.current = null;

      if (node !== null) {
        node.addEventListener("mouseenter", clearTimeoutCallback);
        node.addEventListener("mouseleave", setTimeoutCallback);

        cleanupRef.current = () => {
          node.removeEventListener("mouseenter", clearTimeoutCallback);
          node.removeEventListener("mouseleave", setTimeoutCallback);
        };
      }
    },
    [clearTimeoutCallback, setTimeoutCallback]
  );

  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: handleRef });

  return LayerBehavior(children);
};

GeoBaseLayerExitBehavior.displayName = `${GeoBaseLayerExitBehavior.name}`;

export default GeoBaseLayerExitBehavior;
