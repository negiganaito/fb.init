// __d(
//   "GeoBaseListLayout.react",
//   [
//     "BUIPrivateBoldItemLabelContext",
//     "GeoBaseListLayoutContext",
//     "GeoDomID",
//     "GeoPrivateBaseListMediaBackgroundContext",
//     "GeoPrivateMakeComponent",
//     "react",
//     "stylex",
//     "useGeoPrivateListResponsiveDensity",
//     "useMergeRefs",
//     "useShallowEqualMemo",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || d("react"),
//       k = {
//         root: {
//           display: "x78zum5",
//           listStyle: "xe8uvvx",
//           marginTop: "xdj266r",
//           marginEnd: "x11i5rnm",
//           marginBottom: "xat24cr",
//           marginStart: "x1mh8g0r",
//           paddingTop: "xexx8yu",
//           paddingEnd: "x4uap5",
//           paddingBottom: "x18d9i69",
//           paddingStart: "xkhd6sd",
//           $$css: !0,
//         },
//         vertical: { flexDirection: "xdt5ytf", $$css: !0 },
//         horizontal: { flexDirection: "x1q0g3np", $$css: !0 },
//         verticalSpaced: {
//           ":not([stylex-hack]) > * + *_marginTop": "xdm93yi",
//           $$css: !0,
//         },
//         horizontalSpaced: {
//           ":not([stylex-hack]) > * + *_marginStart": "xe9zolg",
//           $$css: !0,
//         },
//       };
//     function a(a) {
//       var b = a.accessibilityRole;
//       b = b === void 0 ? "list" : b;
//       var e = a.children,
//         f = a.containerRef,
//         g = a["data-testid"];
//       g = a.density;
//       g = g === void 0 ? "dense" : g;
//       var i = a.describedBy,
//         l = a.direction;
//       l = l === void 0 ? "vertical" : l;
//       var m = a.hasBoldItemLabel;
//       m = m === void 0 ? !1 : m;
//       var n = a.id,
//         o = a.labelledBy,
//         p = a.shouldAlignRows;
//       p = p === void 0 ? !1 : p;
//       var q = a.shouldSpaceRows;
//       q = q === void 0 ? !0 : q;
//       var r = a.hasMediaBackground;
//       r = r === void 0 ? !1 : r;
//       a = a.xstyle;
//       g = c("useGeoPrivateListResponsiveDensity")(g);
//       var s = g[0];
//       g = g[1];
//       s = c("useShallowEqualMemo")({
//         density: s,
//         direction: l,
//         isWithinList: !0,
//         shouldAlignRows: p,
//       });
//       p = d("GeoDomID").useApplyGeoDomIDsDirectly({
//         id: n,
//         "aria-labelledby": o,
//         "aria-describedby": i,
//       });
//       n = p.ref;
//       o = babelHelpers.objectWithoutPropertiesLoose(p, ["ref"]);
//       i = c("useMergeRefs")(f, n);
//       return j.jsx(c("BUIPrivateBoldItemLabelContext").Provider, {
//         value: m,
//         children: j.jsx(
//           c("GeoPrivateBaseListMediaBackgroundContext").Provider,
//           {
//             value: r,
//             children: j.jsxs(c("GeoBaseListLayoutContext").Provider, {
//               value: s,
//               children: [
//                 g,
//                 j.jsx(
//                   "div",
//                   babelHelpers["extends"]({}, o, {
//                     className: (h || (h = c("stylex")))(
//                       k.root,
//                       l === "vertical" && k.vertical,
//                       l === "horizontal" && k.horizontal,
//                       q && l === "vertical" && k.verticalSpaced,
//                       q && l === "horizontal" && k.horizontalSpaced,
//                       a
//                     ),
//                     "data-testid": void 0,
//                     ref: i,
//                     role: b,
//                     children: e,
//                   })
//                 ),
//               ],
//             }),
//           }
//         ),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoBaseListLayout", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { ReactNode, RefObject } from "react";
import { BUIPrivateBoldItemLabelContext } from "BUIPrivateBoldItemLabelContext";
import { GeoBaseListLayoutContext } from "GeoBaseListLayoutContext";
import { GeoDomID } from "GeoDomID";
import { GeoPrivateBaseListMediaBackgroundContext } from "GeoPrivateBaseListMediaBackgroundContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import stylex from "stylex";
import { useGeoPrivateListResponsiveDensity } from "useGeoPrivateListResponsiveDensity";
import { useMergeRefs } from "useMergeRefs";
import { useShallowEqualMemo } from "useShallowEqualMemo";

const styles = {
  root: {
    display: "x78zum5",
    listStyle: "xe8uvvx",
    marginTop: "xdj266r",
    marginEnd: "x11i5rnm",
    marginBottom: "xat24cr",
    marginStart: "x1mh8g0r",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    $$css: true,
  },
  vertical: { flexDirection: "xdt5ytf", $$css: true },
  horizontal: { flexDirection: "x1q0g3np", $$css: true },
  verticalSpaced: {
    ":not([stylex-hack]) > * + *": { marginTop: "xdm93yi" },
    $$css: true,
  },
  horizontalSpaced: {
    ":not([stylex-hack]) > * + *": { marginStart: "xe9zolg" },
    $$css: true,
  },
};

interface GeoBaseListLayoutProps {
  accessibilityRole?: string;
  children: ReactNode;
  containerRef?: RefObject<HTMLDivElement>;
  "data-testid"?: string;
  density?: string;
  describedBy?: string;
  direction?: "vertical" | "horizontal";
  hasBoldItemLabel?: boolean;
  id?: string;
  labelledBy?: string;
  shouldAlignRows?: boolean;
  shouldSpaceRows?: boolean;
  hasMediaBackground?: boolean;
  xstyle?: any;
}

const GeoBaseListLayout: React.FC<GeoBaseListLayoutProps> = ({
  accessibilityRole = "list",
  children,
  containerRef,
  "data-testid": dataTestId,
  density = "dense",
  describedBy,
  direction = "vertical",
  hasBoldItemLabel = false,
  id,
  labelledBy,
  shouldAlignRows = false,
  shouldSpaceRows = true,
  hasMediaBackground = false,
  xstyle,
  ...rest
}) => {
  const responsiveDensity = useGeoPrivateListResponsiveDensity(density);
  const [densityClassName, densityClassName2] = responsiveDensity;
  const memoizedValue = useShallowEqualMemo({
    density: densityClassName,
    direction,
    isWithinList: true,
    shouldAlignRows,
  });

  const domIDProps = GeoDomID.useApplyGeoDomIDsDirectly({
    id,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
  });

  const { ref: domIDRef, ...domIDAttributes } = domIDProps;
  const mergedRefs = useMergeRefs(containerRef, domIDRef);

  return (
    <BUIPrivateBoldItemLabelContext.Provider value={hasBoldItemLabel}>
      <GeoPrivateBaseListMediaBackgroundContext.Provider
        value={hasMediaBackground}
      >
        <GeoBaseListLayoutContext.Provider value={memoizedValue}>
          {densityClassName2}
          <div
            {...domIDAttributes}
            className={stylex(
              styles.root,
              direction === "vertical" && styles.vertical,
              direction === "horizontal" && styles.horizontal,
              shouldSpaceRows &&
                direction === "vertical" &&
                styles.verticalSpaced,
              shouldSpaceRows &&
                direction === "horizontal" &&
                styles.horizontalSpaced,
              xstyle
            )}
            data-testid={undefined}
            ref={mergedRefs}
            role={accessibilityRole}
            children={children}
          />
        </GeoBaseListLayoutContext.Provider>
      </GeoPrivateBaseListMediaBackgroundContext.Provider>
    </BUIPrivateBoldItemLabelContext.Provider>
  );
};

GeoBaseListLayout.displayName = "GeoBaseListLayout [from GeoBaseListLayout]";

const GeoBaseListLayoutComponent = makeGeoComponent(
  "GeoBaseListLayout",
  GeoBaseListLayout
);

export default GeoBaseListLayoutComponent;
