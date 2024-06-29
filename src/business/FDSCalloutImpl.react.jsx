// __d(
//   "FDSCalloutImpl.react",
//   ["BaseCalloutImpl.react", "FDSCallout.react", "FDSCalloutContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext;
//     function a(a) {
//       var b = a.calloutID,
//         d = a.calloutProps,
//         e = a.contentID,
//         f = a.titleID,
//         g = j(c("FDSCalloutContext"));
//       if (g == null || d == null) return null;
//       var h = d.disableOutsideClick,
//         k = d.onClose;
//       d = babelHelpers.objectWithoutPropertiesLoose(d, [
//         "disableOutsideClick",
//         "onClose",
//       ]);
//       return i.jsx(
//         c("BaseCalloutImpl.react"),
//         babelHelpers["extends"]({}, a, {
//           children: i.jsx(
//             c("FDSCallout.react"),
//             babelHelpers["extends"]({}, d, {
//               calloutID: b,
//               contentID: e,
//               onClose: function () {
//                 g.removeCallout(b), k == null ? void 0 : k();
//               },
//               onOutsideClick: function () {
//                 h !== !0 && (g.removeCallout(b), k == null ? void 0 : k());
//               },
//               titleID: f,
//             })
//           ),
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useContext } from "react";
import BaseCalloutImpl from "BaseCalloutImpl.react";
import FDSCallout from "FDSCallout.react";
import FDSCalloutContext from "FDSCalloutContext";

interface FDSCalloutImplProps {
  calloutID: string;
  calloutProps: {
    disableOutsideClick?: boolean;
    onClose?: () => void;
    [key: string]: any;
  };
  contentID: string;
  titleID: string;
}

const FDSCalloutImpl: React.FC<FDSCalloutImplProps> = ({
  calloutID,
  calloutProps,
  contentID,
  titleID,
  ...props
}) => {
  const context = useContext(FDSCalloutContext);

  if (context == null || calloutProps == null) return null;

  const { disableOutsideClick, onClose, ...restCalloutProps } = calloutProps;

  return (
    <BaseCalloutImpl {...props}>
      <FDSCallout
        {...restCalloutProps}
        calloutID={calloutID}
        contentID={contentID}
        onClose={() => {
          context.removeCallout(calloutID);
          if (onClose) onClose();
        }}
        onOutsideClick={() => {
          if (!disableOutsideClick) {
            context.removeCallout(calloutID);
            if (onClose) onClose();
          }
        }}
        titleID={titleID}
      />
    </BaseCalloutImpl>
  );
};

FDSCalloutImpl.displayName = `${FDSCalloutImpl.name} [from some-module-id]`;

export default FDSCalloutImpl;
