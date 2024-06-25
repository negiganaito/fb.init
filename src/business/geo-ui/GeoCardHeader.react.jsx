// __d(
//   "GeoCardHeader.react",
//   [
//     "GeoBaseSpacingLayout.react",
//     "GeoCardHeaderLabelContext",
//     "GeoGenericCardHeader.react",
//     "GeoHStack.react",
//     "GeoPrivateMakeComponent",
//     "GeoTextPairing.react",
//     "geoOffset",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext,
//       k = {
//         headerText: { flexGrow: "x1iyjqo2", minWidth: "xeuugli", $$css: !0 },
//         endContent: {
//           alignItems: "x6s0dn4",
//           justifyContent: "x13a6bvl",
//           minHeight: "xu0aao5",
//           $$css: !0,
//         },
//       };
//     function a(a) {
//       var b = a.action,
//         d = a.description,
//         e = a.forwardedRef,
//         f = a.heading;
//       a = a.onBack;
//       var g = j(c("GeoCardHeaderLabelContext"));
//       d = i.jsx(c("GeoTextPairing.react"), {
//         description: d,
//         heading: f,
//         headingId: g,
//         overflowWrap: "break-word",
//         size: "header3",
//         xstyle: k.headerText,
//       });
//       return i.jsx(c("GeoGenericCardHeader.react"), {
//         forwardedRef: e,
//         onBack: a,
//         children:
//           b == null
//             ? d
//             : i.jsxs(c("GeoBaseSpacingLayout.react"), {
//                 align: "start",
//                 children: [
//                   d,
//                   i.jsx(c("GeoHStack.react"), {
//                     shrink: 0,
//                     xstyle: [k.endContent, c("geoOffset").cardAction],
//                     children: b,
//                   }),
//                 ],
//               }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoCardHeader", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, ForwardedRef } from "react";
import GeoBaseSpacingLayout from "GeoBaseSpacingLayout.react";
import GeoCardHeaderLabelContext from "GeoCardHeaderLabelContext";
import GeoGenericCardHeader from "GeoGenericCardHeader.react";
import GeoHStack from "GeoHStack.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import GeoTextPairing from "GeoTextPairing.react";
import { geoOffset } from "geoOffset";

interface GeoCardHeaderProps {
  action?: React.ReactNode;
  description?: React.ReactNode;
  forwardedRef?: ForwardedRef<any>;
  heading: React.ReactNode;
  onBack?: () => void;
}

const styles = {
  headerText: { flexGrow: "x1iyjqo2", minWidth: "xeuugli" },
  endContent: {
    alignItems: "x6s0dn4",
    justifyContent: "x13a6bvl",
    minHeight: "xu0aao5",
  },
};

const GeoCardHeader: React.FC<GeoCardHeaderProps> = ({
  action,
  description,
  forwardedRef,
  heading,
  onBack,
}) => {
  const headingId = useContext(GeoCardHeaderLabelContext);

  const headerText = (
    <GeoTextPairing
      description={description}
      heading={heading}
      headingId={headingId}
      overflowWrap="break-word"
      size="header3"
      xstyle={styles.headerText}
    />
  );

  return (
    <GeoGenericCardHeader forwardedRef={forwardedRef} onBack={onBack}>
      {action == null ? (
        headerText
      ) : (
        <GeoBaseSpacingLayout align="start">
          {headerText}
          <GeoHStack
            shrink={0}
            xstyle={[styles.endContent, geoOffset.cardAction]}
          >
            {action}
          </GeoHStack>
        </GeoBaseSpacingLayout>
      )}
    </GeoGenericCardHeader>
  );
};

GeoCardHeader.displayName = `${GeoCardHeader.name} [from some-module-id]`;

const ExportedGeoCardHeader = makeGeoComponent("GeoCardHeader", GeoCardHeader);
export default ExportedGeoCardHeader;
