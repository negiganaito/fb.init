// __d(
//   "GeoModalHeader.react",
//   [
//     "GeoCardHeader.react",
//     "GeoPrivateCardLayerContext",
//     "GeoPrivateLoggingRegion.react",
//     "GeoPrivateMakeComponent",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var b = a.forwardedRef,
//         d = babelHelpers.objectWithoutPropertiesLoose(a, ["forwardedRef"]);
//       return i.jsx(c("GeoPrivateLoggingRegion.react"), {
//         inputRef: b,
//         isDependentRegion: !0,
//         name: "GeoModalHeader",
//         children: function (a) {
//           return i.jsx(c("GeoPrivateCardLayerContext").Provider, {
//             value: !0,
//             children: i.jsx(
//               c("GeoCardHeader.react"),
//               babelHelpers["extends"]({}, d, { forwardedRef: a })
//             ),
//           });
//         },
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoModalHeader", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { ForwardedRef } from "react";
import GeoCardHeader from "GeoCardHeader.react";
import GeoPrivateCardLayerContext from "GeoPrivateCardLayerContext";
import GeoPrivateLoggingRegion from "GeoPrivateLoggingRegion.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoModalHeaderProps {
  forwardedRef?: ForwardedRef<any>;
  [key: string]: any; // Extendable for additional props
}

const GeoModalHeader: React.FC<GeoModalHeaderProps> = ({
  forwardedRef,
  ...props
}) => {
  return (
    <GeoPrivateLoggingRegion
      inputRef={forwardedRef}
      isDependentRegion
      name="GeoModalHeader"
    >
      {(ref) => (
        <GeoPrivateCardLayerContext.Provider value={true}>
          <GeoCardHeader {...props} forwardedRef={ref} />
        </GeoPrivateCardLayerContext.Provider>
      )}
    </GeoPrivateLoggingRegion>
  );
};

GeoModalHeader.displayName = `${GeoModalHeader.name} [from some-module-id]`;

const ExportedGeoModalHeader = makeGeoComponent(
  "GeoModalHeader",
  GeoModalHeader
);
export default ExportedGeoModalHeader;
