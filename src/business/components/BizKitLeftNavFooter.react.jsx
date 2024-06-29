// __d(
//   "BizKitLeftNavFooter.react",
//   [
//     "BizKitGlobalSearchButton.react",
//     "BizKitNavFooterDropDownMenu.react",
//     "BusinessCometSettingsEndpointModifier.react",
//     "CometPlaceholder.react",
//     "GeoSpinner.react",
//     "cr:2828", // null
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       var d = a.businessCometHelpTraySideBarChatButtonQueryReference;
//       a = a.children;
//       return i.jsx("div", {
//         children: i.jsxs(c("BusinessCometSettingsEndpointModifier.react"), {
//           children: [
//             i.jsx(c("BizKitGlobalSearchButton.react"), {}),
//             a,
//             i.jsx(c("CometPlaceholder.react"), {
//               fallback: i.jsx(c("GeoSpinner.react"), {}),
//               children: i.jsx(c("BizKitNavFooterDropDownMenu.react"), {
//                 businessCometHelpTraySideBarChatButtonQueryReference: d,
//               }),
//             }),
//             b("cr:2828") != null && i.jsx(b("cr:2828"), {}),
//           ],
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import BizKitGlobalSearchButton from "BizKitGlobalSearchButton.react";
import BizKitNavFooterDropDownMenu from "BizKitNavFooterDropDownMenu.react";
import BusinessCometSettingsEndpointModifier from "BusinessCometSettingsEndpointModifier.react";
import CometPlaceholder from "CometPlaceholder.react";
import GeoSpinner from "GeoSpinner.react";

interface BizKitLeftNavFooterProps {
  businessCometHelpTraySideBarChatButtonQueryReference: any;
  children: React.ReactNode;
}

const BizKitLeftNavFooter: React.FC<BizKitLeftNavFooterProps> = ({
  businessCometHelpTraySideBarChatButtonQueryReference,
  children,
}) => {
  return (
    <div>
      <BusinessCometSettingsEndpointModifier>
        <BizKitGlobalSearchButton />
        {children}
        <CometPlaceholder fallback={<GeoSpinner />}>
          <BizKitNavFooterDropDownMenu
            businessCometHelpTraySideBarChatButtonQueryReference={
              businessCometHelpTraySideBarChatButtonQueryReference
            }
          />
        </CometPlaceholder>
      </BusinessCometSettingsEndpointModifier>
    </div>
  );
};

BizKitLeftNavFooter.displayName = `${BizKitLeftNavFooter.name} [from ${module.id}]`;

export default BizKitLeftNavFooter;
