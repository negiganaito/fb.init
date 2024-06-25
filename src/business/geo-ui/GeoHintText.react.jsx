// __d(
//   "GeoHintText.react",
//   [
//     "GeoHeading.react",
//     "GeoPrivateDisabledContext",
//     "GeoPrivateMakeComponent",
//     "GeoText.react",
//     "geoMargin",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var b = a.children,
//         d = a.containerRef,
//         e = a.heading;
//       a = a.whiteSpace;
//       return i.jsx(c("GeoPrivateDisabledContext").Provider, {
//         value: !1,
//         children: i.jsxs("div", {
//           ref: d,
//           children: [
//             e != null &&
//               i.jsx(c("GeoHeading.react"), {
//                 level: 4,
//                 textAlign: "start",
//                 whiteSpace: a,
//                 xstyle: c("geoMargin").top8,
//                 children: e,
//               }),
//             i.jsx(c("GeoText.react"), {
//               display: "block",
//               textAlign: "start",
//               whiteSpace: a,
//               children: b,
//             }),
//           ],
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoHintText", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { ReactNode, Ref } from "react";
import GeoHeading from "GeoHeading.react";
import { GeoPrivateDisabledContext } from "GeoPrivateDisabledContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import GeoText from "GeoText.react";
import { geoMargin } from "geoMargin";

interface GeoHintTextProps {
  children: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  heading?: ReactNode;
  whiteSpace?: string;
}

const GeoHintText: React.FC<GeoHintTextProps> = ({
  children,
  containerRef,
  heading,
  whiteSpace,
}) => {
  return (
    <GeoPrivateDisabledContext.Provider value={false}>
      <div ref={containerRef}>
        {heading != null && (
          <GeoHeading
            level={4}
            textAlign="start"
            whiteSpace={whiteSpace}
            xstyle={geoMargin.top8}
          >
            {heading}
          </GeoHeading>
        )}
        <GeoText display="block" textAlign="start" whiteSpace={whiteSpace}>
          {children}
        </GeoText>
      </div>
    </GeoPrivateDisabledContext.Provider>
  );
};

GeoHintText.displayName = `${GeoHintText.name} [from some-module-id]`;

const ExportedGeoHintText = makeGeoComponent("GeoHintText", GeoHintText);
export default ExportedGeoHintText;
