// __d(
//   "GeoModal.react",
//   [
//     "GeoBaseModal.react",
//     "GeoModalCard.react",
//     "GeoPrivateLoggingRegion.react",
//     "GeoPrivateMakeComponent",
//     "react",
//     "useGeoPrivateScalingModalTransition",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var b = a.onEnterComplete,
//         d = a["data-testid"],
//         e = a.children;
//       d = a.containerRef;
//       var f = a.footer,
//         g = a.header,
//         h = a.height,
//         j = a.isShown,
//         k = a.label,
//         l = a.labelledBy,
//         m = a.xstyle,
//         n = babelHelpers.objectWithoutPropertiesLoose(a, [
//           "onEnterComplete",
//           "data-testid",
//           "children",
//           "containerRef",
//           "footer",
//           "header",
//           "height",
//           "isShown",
//           "label",
//           "labelledBy",
//           "xstyle",
//         ]),
//         o = c("useGeoPrivateScalingModalTransition")(j, b);
//       return i.jsx(c("GeoPrivateLoggingRegion.react"), {
//         inputRef: d,
//         name: "GeoModal",
//         children: function (a) {
//           return i.jsx(
//             c("GeoBaseModal.react"),
//             babelHelpers["extends"]({ dialogTransition: o, isShown: j }, n, {
//               children: i.jsx(c("GeoModalCard.react"), {
//                 containerRef: a,
//                 "data-testid": void 0,
//                 footer: f,
//                 header: g,
//                 height: h,
//                 label: k,
//                 labelledBy: l,
//                 xstyle: m,
//                 children: e,
//               }),
//             })
//           );
//         },
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoModal", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { ReactNode, Ref } from "react";
import GeoBaseModal from "GeoBaseModal.react";
import GeoModalCard from "GeoModalCard.react";
import GeoPrivateLoggingRegion from "GeoPrivateLoggingRegion.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import useGeoPrivateScalingModalTransition from "useGeoPrivateScalingModalTransition";

interface GeoModalProps {
  onEnterComplete?: () => void;
  "data-testid"?: string;
  children: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  footer?: ReactNode;
  header?: ReactNode;
  height?: string | number;
  isShown: boolean;
  label?: string;
  labelledBy?: string;
  xstyle?: any; // Extendable for additional props
  [key: string]: any; // Additional props
}

const GeoModal: React.FC<GeoModalProps> = ({
  onEnterComplete,
  "data-testid": dataTestId,
  children,
  containerRef,
  footer,
  header,
  height,
  isShown,
  label,
  labelledBy,
  xstyle,
  ...restProps
}) => {
  const dialogTransition = useGeoPrivateScalingModalTransition(
    isShown,
    onEnterComplete
  );

  return (
    <GeoPrivateLoggingRegion inputRef={containerRef} name="GeoModal">
      {(ref) => (
        <GeoBaseModal
          dialogTransition={dialogTransition}
          isShown={isShown}
          {...restProps}
        >
          <GeoModalCard
            containerRef={ref}
            data-testid={dataTestId}
            footer={footer}
            header={header}
            height={height}
            label={label}
            labelledBy={labelledBy}
            xstyle={xstyle}
          >
            {children}
          </GeoModalCard>
        </GeoBaseModal>
      )}
    </GeoPrivateLoggingRegion>
  );
};

GeoModal.displayName = `${GeoModal.name} [from some-module-id]`;

const ExportedGeoModal = makeGeoComponent("GeoModal", GeoModal);
export default ExportedGeoModal;
