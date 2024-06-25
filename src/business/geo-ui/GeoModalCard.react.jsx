// __d(
//   "GeoModalCard.react",
//   [
//     "GeoPrivateBottomSheetContext",
//     "GeoPrivateCard.react",
//     "GeoPrivateMakeComponent",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext,
//       k = {
//         root: {
//           display: "x78zum5",
//           flexDirection: "xdt5ytf",
//           maxHeight: "xqui1pq",
//           $$css: !0,
//         },
//         bottomSheetCard: {
//           borderBottomStartRadius: "xo71vjh",
//           borderBottomEndRadius: "x5pf9jr",
//           maxHeight: "xyzch88",
//           $$css: !0,
//         },
//       };
//     function a(a) {
//       var b = a.children,
//         d = a.containerRef,
//         e = a.xstyle;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "children",
//         "containerRef",
//         "xstyle",
//       ]);
//       var f = j(c("GeoPrivateBottomSheetContext"));
//       return i.jsx(
//         c("GeoPrivateCard.react"),
//         babelHelpers["extends"]({}, a, {
//           containerRef: d,
//           xstyle: [k.root, f && k.bottomSheetCard, e],
//           children: i.jsx(c("GeoPrivateBottomSheetContext").Provider, {
//             value: !1,
//             children: b,
//           }),
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoModalCard", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, ReactNode, Ref } from "react";
import GeoPrivateBottomSheetContext from "GeoPrivateBottomSheetContext";
import GeoPrivateCard from "GeoPrivateCard.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoModalCardProps {
  children: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  xstyle?: any; // Adjust the type based on your specific styling solution
  [key: string]: any; // Additional props
}

const styles = {
  root: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    maxHeight: "xqui1pq",
  },
  bottomSheetCard: {
    borderBottomStartRadius: "xo71vjh",
    borderBottomEndRadius: "x5pf9jr",
    maxHeight: "xyzch88",
  },
};

const GeoModalCard: React.FC<GeoModalCardProps> = ({
  children,
  containerRef,
  xstyle,
  ...props
}) => {
  const isBottomSheet = useContext(GeoPrivateBottomSheetContext);

  return (
    <GeoPrivateCard
      {...props}
      containerRef={containerRef}
      xstyle={[styles.root, isBottomSheet && styles.bottomSheetCard, xstyle]}
    >
      <GeoPrivateBottomSheetContext.Provider value={false}>
        {children}
      </GeoPrivateBottomSheetContext.Provider>
    </GeoPrivateCard>
  );
};

GeoModalCard.displayName = `${GeoModalCard.name} [from some-module-id]`;

const ExportedGeoModalCard = makeGeoComponent("GeoModalCard", GeoModalCard);
export default ExportedGeoModalCard;
