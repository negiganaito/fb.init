// __d(
//   "GeoPrivateBaseDOMContainer.react",
//   ["react", "useMergeRefs"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useLayoutEffect,
//       k = b.useRef;
//     e = i.forwardRef(a);
//     function a(a, b) {
//       var d = a.node,
//         e = k(null);
//       j(
//         function () {
//           var a = e.current;
//           if (d != null && a != null) {
//             a.appendChild(d);
//             return function () {
//               a.removeChild(d);
//             };
//           }
//         },
//         [d]
//       );
//       a = c("useMergeRefs")(b, e);
//       return i.jsx("div", { ref: a });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     d = i.memo(e);
//     g["default"] = d;
//   },
//   98
// );

import React, { useLayoutEffect, useRef, forwardRef, memo } from "react";
import useMergeRefs from "some-useMergeRefs-hook";

interface GeoPrivateBaseDOMContainerProps {
  node: HTMLElement | null;
}

const GeoPrivateBaseDOMContainer = forwardRef<
  HTMLDivElement,
  GeoPrivateBaseDOMContainerProps
>(({ node }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentElement = localRef.current;
    if (node != null && currentElement != null) {
      currentElement.appendChild(node);
      return () => {
        currentElement.removeChild(node);
      };
    }
  }, [node]);

  const mergedRef = useMergeRefs(ref, localRef);

  return <div ref={mergedRef} />;
});

GeoPrivateBaseDOMContainer.displayName = `${GeoPrivateBaseDOMContainer.name} [from some-module-id]`;

export default memo(GeoPrivateBaseDOMContainer);
