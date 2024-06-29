// __d(
//   "BaseCalloutImpl.react",
//   [
//     "BaseContextualLayer.react",
//     "BaseContextualLayerAnchorRootContext",
//     "LayoutAnimationBoundaryContext",
//     "react",
//     "useCometDisplayTimingTrackerForInteraction",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useEffect;
//     function a(a) {
//       var b = a.anchorRef,
//         d = a.anchorRootRefContext,
//         e = a.animationContext,
//         f = a.children,
//         g = a.contextualLayerProps,
//         h = a.imperativeRef,
//         k = a.scrollableAreaContext;
//       a = c("useCometDisplayTimingTrackerForInteraction")("FDSCalloutManager");
//       j(
//         function () {
//           var a = k
//               .map(function (a) {
//                 return a.getDOMNode();
//               })
//               .filter(Boolean),
//             b = function () {
//               var a;
//               return (a = h.current) == null ? void 0 : a.reposition();
//             };
//           if (a.length > 0) {
//             a.forEach(function (a) {
//               return a.addEventListener("scroll", b, { passive: !0 });
//             });
//             return function () {
//               a.forEach(function (a) {
//                 return a.removeEventListener("scroll", b, { passive: !0 });
//               });
//             };
//           }
//         },
//         [h, k]
//       );
//       return g == null || b == null
//         ? null
//         : i.jsx(c("LayoutAnimationBoundaryContext").Provider, {
//             value: e,
//             children: i.jsx(
//               c("BaseContextualLayerAnchorRootContext").Provider,
//               {
//                 value: d,
//                 children:
//                   g != null
//                     ? i.jsx(c("BaseContextualLayer.react"), {
//                         align: g.align,
//                         contextRef: b,
//                         disableAutoAlign: g.disableAutoAlign,
//                         disableAutoFlip: g.disableAutoFlip,
//                         imperativeRef: h,
//                         position: g.position,
//                         ref: a,
//                         children: f,
//                       })
//                     : null,
//               }
//             ),
//           });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useEffect, MutableRefObject, RefObject } from "react";
import BaseContextualLayer from "BaseContextualLayer.react";
import BaseContextualLayerAnchorRootContext from "BaseContextualLayerAnchorRootContext";
import LayoutAnimationBoundaryContext from "LayoutAnimationBoundaryContext";
import useCometDisplayTimingTrackerForInteraction from "useCometDisplayTimingTrackerForInteraction";

interface BaseCalloutImplProps {
  anchorRef: RefObject<HTMLElement>;
  anchorRootRefContext: any; // Provide a proper type if available
  animationContext: any; // Provide a proper type if available
  children: React.ReactNode;
  contextualLayerProps: {
    align?: string;
    disableAutoAlign?: boolean;
    disableAutoFlip?: boolean;
    position?: string;
  } | null;
  imperativeRef: MutableRefObject<{ reposition: () => void } | null>;
  scrollableAreaContext: Array<{ getDOMNode: () => HTMLElement | null }>;
}

const BaseCalloutImpl: React.FC<BaseCalloutImplProps> = ({
  anchorRef,
  anchorRootRefContext,
  animationContext,
  children,
  contextualLayerProps,
  imperativeRef,
  scrollableAreaContext,
}) => {
  const displayTimingTrackerRef =
    useCometDisplayTimingTrackerForInteraction("FDSCalloutManager");

  useEffect(() => {
    const nodes = scrollableAreaContext
      .map((context) => context.getDOMNode())
      .filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      imperativeRef.current?.reposition();
    };

    if (nodes.length > 0) {
      nodes.forEach((node) =>
        node.addEventListener("scroll", handleScroll, { passive: true })
      );
      return () => {
        nodes.forEach((node) =>
          node.removeEventListener("scroll", handleScroll, { passive: true })
        );
      };
    }
  }, [imperativeRef, scrollableAreaContext]);

  if (contextualLayerProps == null || anchorRef == null) return null;

  return (
    <LayoutAnimationBoundaryContext.Provider value={animationContext}>
      <BaseContextualLayerAnchorRootContext.Provider
        value={anchorRootRefContext}
      >
        {contextualLayerProps != null ? (
          <BaseContextualLayer
            align={contextualLayerProps.align}
            contextRef={anchorRef}
            disableAutoAlign={contextualLayerProps.disableAutoAlign}
            disableAutoFlip={contextualLayerProps.disableAutoFlip}
            imperativeRef={imperativeRef}
            position={contextualLayerProps.position}
            ref={displayTimingTrackerRef}
          >
            {children}
          </BaseContextualLayer>
        ) : null}
      </BaseContextualLayerAnchorRootContext.Provider>
    </LayoutAnimationBoundaryContext.Provider>
  );
};

BaseCalloutImpl.displayName = `${BaseCalloutImpl.name} [from some-module-id]`;

export default BaseCalloutImpl;
