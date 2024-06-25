// __d(
//   "GeoMenu.react",
//   [
//     "GeoBaseInteractiveList.react",
//     "GeoMenuLayoutContext",
//     "GeoPrivateMakeComponent",
//     "GeoSelectionContext",
//     "react",
//     "useHoverState",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useEffect,
//       k = b.useMemo,
//       l = b.useState,
//       m = 800;
//     function a(a) {
//       var b = a.children,
//         d = a["data-testid"];
//       d = a.id;
//       a = l(null);
//       var e = a[0],
//         f = a[1];
//       a = k(
//         function () {
//           return { value: e, onSelect: f };
//         },
//         [e, f]
//       );
//       var g = c("useHoverState")(),
//         h = g.isHovered,
//         o = g.onMouseEnter;
//       g = g.onMouseLeave;
//       j(
//         function () {
//           if (!h) {
//             var a = window.setTimeout(function () {
//               return f(null);
//             }, m);
//             return function () {
//               return window.clearTimeout(a);
//             };
//           }
//         },
//         [f, h]
//       );
//       return i.jsx(c("GeoSelectionContext").Provider, {
//         value: a,
//         children: i.jsx("div", {
//           onMouseEnter: o,
//           onMouseLeave: g,
//           children: i.jsx(c("GeoBaseInteractiveList.react"), {
//             accessibilityRole: "menu",
//             "data-testid": void 0,
//             density: "sparse",
//             id: d,
//             preventScrollOnFocus: !1,
//             children: i.jsx(c("GeoMenuLayoutContext").Provider, {
//               value: n,
//               children: b,
//             }),
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     function n(a) {
//       var b = a.isFirst,
//         c = a.isLast,
//         d = a.index;
//       a = a.values;
//       d = d > 0 && ((a = a[d - 1]) == null ? void 0 : a.isSeparator);
//       return !b && !c && !d;
//     }
//     e = d("GeoPrivateMakeComponent").makeGeoComponent("GeoMenu", a);
//     g["default"] = e;
//   },
//   98
// );

import React, { useEffect, useMemo, useState } from "react";
import GeoBaseInteractiveList from "GeoBaseInteractiveList.react";
import { GeoMenuLayoutContext } from "GeoMenuLayoutContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { GeoSelectionContext } from "GeoSelectionContext";
import { useHoverState } from "useHoverState";

const HOVER_DELAY = 800;

interface GeoMenuProps {
  children: React.ReactNode;
  "data-testid"?: string;
  id?: string;
}

const GeoMenu: React.FC<GeoMenuProps> = ({
  children,
  "data-testid": dataTestId,
  id,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const selectionContextValue = useMemo(
    () => ({ value: selectedValue, onSelect: setSelectedValue }),
    [selectedValue]
  );

  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  useEffect(() => {
    if (!isHovered) {
      const timer = window.setTimeout(
        () => setSelectedValue(null),
        HOVER_DELAY
      );
      return () => window.clearTimeout(timer);
    }
  }, [isHovered]);

  return (
    <GeoSelectionContext.Provider value={selectionContextValue}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <GeoBaseInteractiveList
          accessibilityRole="menu"
          data-testid={dataTestId}
          density="sparse"
          id={id}
          preventScrollOnFocus={false}
        >
          <GeoMenuLayoutContext.Provider value={shouldDisplaySeparator}>
            {children}
          </GeoMenuLayoutContext.Provider>
        </GeoBaseInteractiveList>
      </div>
    </GeoSelectionContext.Provider>
  );
};

GeoMenu.displayName = `${GeoMenu.name}`;

function shouldDisplaySeparator({ isFirst, isLast, index, values }: any) {
  const prevValue = index > 0 ? values[index - 1] : null;
  const isPrevSeparator = prevValue?.isSeparator;
  return !isFirst && !isLast && !isPrevSeparator;
}

export default makeGeoComponent("GeoMenu", GeoMenu);
