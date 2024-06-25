// __d(
//   "GeoCancelButton.react",
//   [
//     "fbt",
//     "GeoPrivateBaseButton.react",
//     "GeoPrivateCloseButtonContext",
//     "GeoPrivateMakeComponent",
//     "LayerHideSources",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react"));
//     b = i;
//     var k = b.useCallback,
//       l = b.useContext;
//     function a(a) {
//       var b = a.containerRef,
//         d = a.label;
//       d = d === void 0 ? h._("Cancel") : d;
//       var e = a.onClick;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "containerRef",
//         "label",
//         "onClick",
//       ]);
//       var f = l(c("GeoPrivateCloseButtonContext")),
//         g = f.onHide;
//       f = k(
//         function (a) {
//           e == null ? void 0 : e(a),
//             g == null ? void 0 : g(c("LayerHideSources").LAYER_CANCEL_BUTTON);
//         },
//         [e, g]
//       );
//       return j.jsx(
//         c("GeoPrivateBaseButton.react"),
//         babelHelpers["extends"]({}, a, {
//           containerRef: b,
//           label: d,
//           loggingName: "GeoCancelButton",
//           onClick: f,
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     e = d("GeoPrivateMakeComponent").makeGeoComponent("GeoCancelButton", a);
//     g["default"] = e;
//   },
//   226
// );

// GeoCancelButton.react.tsx

import { fbt } from "fbt";
import GeoPrivateBaseButton from "GeoPrivateBaseButton.react";
import { GeoPrivateCloseButtonContext } from "GeoPrivateCloseButtonContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { LayerHideSources } from "LayerHideSources";
import React, { useCallback, useContext } from "react";

interface GeoCancelButtonProps {
  containerRef?: React.RefObject<HTMLElement>;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

const GeoCancelButton: React.FC<GeoCancelButtonProps> = (props) => {
  const {
    containerRef,
    label = fbt("Cancel", "Cancel"),
    onClick,
    ...rest
  } = props;
  const { onHide } = useContext(GeoPrivateCloseButtonContext);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onHide?.(LayerHideSources.LAYER_CANCEL_BUTTON);
    },
    [onClick, onHide]
  );

  return (
    <GeoPrivateBaseButton
      {...rest}
      containerRef={containerRef}
      label={label}
      loggingName="GeoCancelButton"
      onClick={handleClick}
    />
  );
};

GeoCancelButton.displayName = `GeoCancelButton [from ${module.id}]`;

export default makeGeoComponent("GeoCancelButton", GeoCancelButton);
