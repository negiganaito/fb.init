// __d(
//   "BizKitLeftNavLinksSectionGenericBadge.react",
//   [
//     "BizKitLeftNavBadgeIcon.react",
//     "logBizKitBadgeSidebarItem",
//     "react",
//     "useBizKitBaseLoggingData",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useEffect;
//     function a(a) {
//       var b = a.itemName,
//         e = a.position,
//         f = a.testid,
//         g = a.unreadCount,
//         h = c("useBizKitBaseLoggingData")();
//       j(
//         function () {
//           d("logBizKitBadgeSidebarItem").logBizKitBadgeSidebarItem(
//             b,
//             g,
//             "dot",
//             "GLOBAL_NAV",
//             e,
//             h
//           );
//         },
//         [h, g, b, e]
//       );
//       f = null;
//       g > 0 &&
//         (f = i.jsx(c("BizKitLeftNavBadgeIcon.react"), {
//           "data-testid": void 0,
//         }));
//       return f;
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useEffect } from "react";
import BizKitLeftNavBadgeIcon from "BizKitLeftNavBadgeIcon.react";
import { logBizKitBadgeSidebarItem } from "logBizKitBadgeSidebarItem";
import { useBizKitBaseLoggingData } from "useBizKitBaseLoggingData";

interface BizKitLeftNavLinksSectionGenericBadgeProps {
  itemName: string;
  position: string;
  testid?: string;
  unreadCount: number;
}

const BizKitLeftNavLinksSectionGenericBadge: React.FC<
  BizKitLeftNavLinksSectionGenericBadgeProps
> = ({ itemName, position, testid, unreadCount }) => {
  const loggingData = useBizKitBaseLoggingData();

  useEffect(() => {
    logBizKitBadgeSidebarItem(
      itemName,
      unreadCount,
      "dot",
      "GLOBAL_NAV",
      position,
      loggingData
    );
  }, [loggingData, unreadCount, itemName, position]);

  if (unreadCount <= 0) {
    return null;
  }

  return <BizKitLeftNavBadgeIcon data-testid={testid} />;
};

BizKitLeftNavLinksSectionGenericBadge.displayName = `${BizKitLeftNavLinksSectionGenericBadge.name}`;

export default BizKitLeftNavLinksSectionGenericBadge;
