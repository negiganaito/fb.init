// __d(
//   "GeoBaseInteractiveList.react",
//   [
//     "FocusGroup.react",
//     "GeoBaseInteractiveListContext",
//     "GeoBaseListLayout.react",
//     "GeoPrivateMakeComponent",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useCallback,
//       k = b.useMemo,
//       l = b.useRef;
//     function a(a) {
//       var b = a.children,
//         e = a.containerRef,
//         f = a.direction;
//       f = f === void 0 ? "vertical" : f;
//       var g = a.preventScrollOnFocus;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "children",
//         "containerRef",
//         "direction",
//         "preventScrollOnFocus",
//       ]);
//       var h = l(new Map()),
//         m = j(
//           function (a) {
//             h.current.set(a, a);
//           },
//           [h]
//         ),
//         n = j(
//           function (a) {
//             h.current["delete"](a);
//           },
//           [h]
//         ),
//         o = j(
//           function (a, b, c) {
//             return h.current.has(c);
//           },
//           [h]
//         ),
//         p = j(
//           function (a, b, c) {
//             return h.current.has(c) && b.role === "option";
//           },
//           [h]
//         ),
//         q = k(
//           function () {
//             return d("FocusGroup.react").createFocusGroup(o);
//           },
//           [o]
//         ),
//         r = q[0],
//         s = q[1];
//       q = k(
//         function () {
//           return { registerItem: m, deregisterItem: n, FocusItem: s };
//         },
//         [m, n, s]
//       );
//       return i.jsx(c("GeoBaseInteractiveListContext").Provider, {
//         value: q,
//         children: i.jsx(r, {
//           orientation: f,
//           preventScrollOnFocus: g,
//           tabScopeQuery: p,
//           children: i.jsx(
//             c("GeoBaseListLayout.react"),
//             babelHelpers["extends"]({}, a, {
//               containerRef: e,
//               direction: f,
//               children: b,
//             })
//           ),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     e = d("GeoPrivateMakeComponent").makeGeoComponent(
//       "GeoBaseInteractiveList",
//       a
//     );
//     g["default"] = e;
//   },
//   98
// );

import React, { useCallback, useMemo, useRef, ReactNode } from "react";
import FocusGroup from "FocusGroup.react";
import { GeoBaseInteractiveListContext } from "GeoBaseInteractiveListContext";
import GeoBaseListLayout from "GeoBaseListLayout.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoBaseInteractiveListProps {
  children: ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  direction?: "vertical" | "horizontal";
  preventScrollOnFocus?: boolean;
}

const GeoBaseInteractiveList: React.FC<GeoBaseInteractiveListProps> = ({
  children,
  containerRef,
  direction = "vertical",
  preventScrollOnFocus,
  ...rest
}) => {
  const itemMapRef = useRef(new Map());

  const registerItem = useCallback((item: any) => {
    itemMapRef.current.set(item, item);
  }, []);

  const deregisterItem = useCallback((item: any) => {
    itemMapRef.current.delete(item);
  }, []);

  const hasItem = useCallback((item: any) => {
    return itemMapRef.current.has(item);
  }, []);

  const tabScopeQuery = useCallback((item: any, context: any, id: any) => {
    return itemMapRef.current.has(id) && context.role === "option";
  }, []);

  const [FocusGroupComp, FocusItem] = useMemo(() => {
    return FocusGroup.createFocusGroup(hasItem);
  }, [hasItem]);

  const contextValue = useMemo(() => {
    return { registerItem, deregisterItem, FocusItem };
  }, [registerItem, deregisterItem, FocusItem]);

  return (
    <GeoBaseInteractiveListContext.Provider value={contextValue}>
      <FocusGroupComp
        orientation={direction}
        preventScrollOnFocus={preventScrollOnFocus}
        tabScopeQuery={tabScopeQuery}
      >
        <GeoBaseListLayout
          {...rest}
          containerRef={containerRef}
          direction={direction}
        >
          {children}
        </GeoBaseListLayout>
      </FocusGroupComp>
    </GeoBaseInteractiveListContext.Provider>
  );
};

GeoBaseInteractiveList.displayName = `${GeoBaseInteractiveList.name}`;

const GeoBaseInteractiveListComponent = makeGeoComponent(
  "GeoBaseInteractiveList",
  GeoBaseInteractiveList
);

export default GeoBaseInteractiveListComponent;
