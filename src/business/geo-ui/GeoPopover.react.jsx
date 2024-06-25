// __d(
//   "GeoPopover.react",
//   [
//     "GeoPopoverContent.react",
//     "GeoPopoverUtils",
//     "GeoPrivateHintLayer.react",
//     "GeoPrivateMakeComponent",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var b = a.action,
//         e = a.learnMore,
//         f = a.heading,
//         g = a.description,
//         h = a.content,
//         j = a.status;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "action",
//         "learnMore",
//         "heading",
//         "description",
//         "content",
//         "status",
//       ]);
//       var k = d("GeoPopoverUtils").getDefaultProps(a),
//         l = function (a) {
//           return i.jsx(
//             c("GeoPopoverContent.react"),
//             babelHelpers["extends"]({}, a, {
//               action: b,
//               content: h,
//               description: g,
//               heading: f,
//               learnMore: e,
//               status: j,
//             })
//           );
//         };
//       return i.jsx(
//         c("GeoPrivateHintLayer.react"),
//         babelHelpers["extends"]({}, a, k, {
//           contentRenderer: l,
//           popoverType: "popover",
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoPopover", a);
//     g["default"] = b;
//   },
//   98
// );

import React from "react";
import GeoPopoverContent from "GeoPopoverContent.react";
import { getDefaultProps } from "GeoPopoverUtils";
import GeoPrivateHintLayer from "GeoPrivateHintLayer.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface GeoPopoverProps {
  action?: React.ReactNode;
  learnMore?: React.ReactNode;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  status?: string;
  [key: string]: any; // To accommodate additional props
}

const GeoPopover: React.FC<GeoPopoverProps> = ({
  action,
  learnMore,
  heading,
  description,
  content,
  status,
  ...restProps
}) => {
  const defaultProps = getDefaultProps(restProps);

  const renderContent = (props: any) => (
    <GeoPopoverContent
      {...props}
      action={action}
      content={content}
      description={description}
      heading={heading}
      learnMore={learnMore}
      status={status}
    />
  );

  return (
    <GeoPrivateHintLayer
      {...restProps}
      {...defaultProps}
      contentRenderer={renderContent}
      popoverType="popover"
    />
  );
};

GeoPopover.displayName = `${GeoPopover.name} [from some-module-id]`;

const ExportedGeoPopover = makeGeoComponent("GeoPopover", GeoPopover);
export default ExportedGeoPopover;
