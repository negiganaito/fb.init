// __d(
//   "GeoModalFooter.react",
//   [
//     "GeoPrivateCardFooter.react",
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
//         name: "GeoModalFooter",
//         children: function (a) {
//           return i.jsx(
//             c("GeoPrivateCardFooter.react"),
//             babelHelpers["extends"]({}, d, { forwardedRef: a })
//           );
//         },
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoModalFooter", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { ForwardedRef } from "react";
import GeoPrivateCardFooter from "GeoPrivateCardFooter.react";
import GeoPrivateLoggingRegion from "GeoPrivateLoggingRegion.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoModalFooterProps {
  forwardedRef?: ForwardedRef<any>;
  [key: string]: any; // Extendable for additional props
}

const GeoModalFooter: React.FC<GeoModalFooterProps> = ({
  forwardedRef,
  ...props
}) => {
  return (
    <GeoPrivateLoggingRegion
      inputRef={forwardedRef}
      isDependentRegion
      name="GeoModalFooter"
    >
      {(ref) => <GeoPrivateCardFooter {...props} forwardedRef={ref} />}
    </GeoPrivateLoggingRegion>
  );
};

GeoModalFooter.displayName = `${GeoModalFooter.name} [from some-module-id]`;

const ExportedGeoModalFooter = makeGeoComponent(
  "GeoModalFooter",
  GeoModalFooter
);
export default ExportedGeoModalFooter;
