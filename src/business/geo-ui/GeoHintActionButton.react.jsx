// __d(
//   "GeoHintActionButton.react",
//   ["GeoButton.react", "GeoPrivateMakeComponent", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var b = a.variant;
//       b = b === void 0 ? "primary" : b;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, ["variant"]);
//       return i.jsx(
//         c("GeoButton.react"),
//         babelHelpers["extends"]({ variant: b }, a)
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoHintActionButton", a);
//     g["default"] = b;
//   },
//   98
// );

import React from "react";
import GeoButton from "GeoButton.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoHintActionButtonProps
  extends React.ComponentProps<typeof GeoButton> {
  variant?: string;
}

const GeoHintActionButton: React.FC<GeoHintActionButtonProps> = ({
  variant = "primary",
  ...props
}) => {
  return <GeoButton variant={variant} {...props} />;
};

GeoHintActionButton.displayName = `${GeoHintActionButton.name} [from some-module-id]`;

const ExportedGeoHintActionButton = makeGeoComponent(
  "GeoHintActionButton",
  GeoHintActionButton
);
export default ExportedGeoHintActionButton;
