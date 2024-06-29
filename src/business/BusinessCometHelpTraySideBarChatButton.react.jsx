// __d(
//   "BusinessCometHelpTraySideBarChatButton.react",
//   [
//     "BusinessCometHelpTraySideBarChatButtonQuery.graphql",
//     "BusinessHelpTraySideBarChatButton.react",
//     "RelayHooks",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || d("react");
//     function a(a) {
//       a = a.businessCometHelpTraySideBarChatButtonQueryReference;
//       a = d("RelayHooks").usePreloadedQuery(
//         h !== void 0
//           ? h
//           : (h = b("BusinessCometHelpTraySideBarChatButtonQuery.graphql")),
//         a
//       );
//       return j.jsx(c("BusinessHelpTraySideBarChatButton.react"), {
//         buttonDataKey: a == null ? void 0 : a.viewer,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import { usePreloadedQuery } from "RelayHooks";
import BusinessHelpTraySideBarChatButton from "BusinessHelpTraySideBarChatButton.react";
import { BusinessCometHelpTraySideBarChatButtonQuery } from "BusinessCometHelpTraySideBarChatButtonQuery.graphql";

interface BusinessCometHelpTraySideBarChatButtonProps {
  businessCometHelpTraySideBarChatButtonQueryReference: any;
}

const BusinessCometHelpTraySideBarChatButton: React.FC<
  BusinessCometHelpTraySideBarChatButtonProps
> = ({ businessCometHelpTraySideBarChatButtonQueryReference }) => {
  const data = usePreloadedQuery(
    BusinessCometHelpTraySideBarChatButtonQuery,
    businessCometHelpTraySideBarChatButtonQueryReference
  );

  return <BusinessHelpTraySideBarChatButton buttonDataKey={data?.viewer} />;
};

BusinessCometHelpTraySideBarChatButton.displayName = `${BusinessCometHelpTraySideBarChatButton.name} [from ${module.id}]`;

export default BusinessCometHelpTraySideBarChatButton;
