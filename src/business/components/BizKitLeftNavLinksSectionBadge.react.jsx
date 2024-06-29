// __d(
//   "BizKitLeftNavLinksSectionBadge.react",
//   [
//     "BizKitLeftNavLinksSectionBadge_navigationItem.graphql",
//     "BizKitLeftNavLinksSectionGenericBadge.react",
//     "BizKitLeftNavSidebarItemContext",
//     "BizKitNavigationOverlayName",
//     "BizKitNavigationRouteName",
//     "CometVisualCompletionAttributes",
//     "RelayFBMatchContainer",
//     "RelayHooks",
//     "getJSEnumSafe",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react")),
//       k = i.useContext;
//     function a(a) {
//       var e,
//         f = a.clearLCBadgeCount,
//         g = a["data-testid"],
//         i = a.navigationItem;
//       a = a.nullifyNoBadge;
//       a = a === void 0 ? !1 : a;
//       i = d("RelayHooks").useFragment(
//         h !== void 0
//           ? h
//           : (h = b("BizKitLeftNavLinksSectionBadge_navigationItem.graphql")),
//         i
//       );
//       var l = k(c("BizKitLeftNavSidebarItemContext"));
//       l = l.position;
//       var m = c("getJSEnumSafe")(c("BizKitNavigationRouteName"), i.route_name),
//         n = c("getJSEnumSafe")(
//           c("BizKitNavigationOverlayName"),
//           i.overlay_name
//         );
//       e = (e = m) != null ? e : n;
//       n = (n = i.unread_count) != null ? n : 0;
//       m === "LEADS_CENTER" && f && (n = 0);
//       return n === 0 && a
//         ? null
//         : j.jsx(
//             "div",
//             babelHelpers["extends"](
//               {},
//               c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
//               {
//                 children: j.jsx(c("RelayFBMatchContainer"), {
//                   match: i.badge,
//                   props: { itemName: e, position: l, testid: g },
//                   fallback: j.jsx(
//                     c("BizKitLeftNavLinksSectionGenericBadge.react"),
//                     { unreadCount: n, itemName: e, position: l, testid: void 0 }
//                   ),
//                 }),
//               }
//             )
//           );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useContext } from "react";
import { useFragment } from "RelayHooks";
import { BizKitLeftNavSidebarItemContext } from "BizKitLeftNavSidebarItemContext";
import {
  BizKitNavigationRouteName,
  BizKitNavigationOverlayName,
} from "BizKitNavigationEnums";
import { CometVisualCompletionAttributes } from "CometVisualCompletionAttributes";
import { RelayFBMatchContainer } from "RelayFBMatchContainer";
import { getJSEnumSafe } from "getJSEnumSafe";
import BizKitLeftNavLinksSectionGenericBadge from "BizKitLeftNavLinksSectionGenericBadge.react";
import { BizKitLeftNavLinksSectionBadge_navigationItem } from "BizKitLeftNavLinksSectionBadge_navigationItem.graphql";

interface BizKitLeftNavLinksSectionBadgeProps {
  clearLCBadgeCount?: boolean;
  "data-testid"?: string;
  navigationItem: any;
  nullifyNoBadge?: boolean;
}

const BizKitLeftNavLinksSectionBadge: React.FC<
  BizKitLeftNavLinksSectionBadgeProps
> = ({
  clearLCBadgeCount,
  "data-testid": dataTestId,
  navigationItem,
  nullifyNoBadge = false,
}) => {
  const fragmentData = useFragment(
    BizKitLeftNavLinksSectionBadge_navigationItem,
    navigationItem
  );

  const { position } = useContext(BizKitLeftNavSidebarItemContext);
  const routeName = getJSEnumSafe(
    BizKitNavigationRouteName,
    fragmentData.route_name
  );
  const overlayName = getJSEnumSafe(
    BizKitNavigationOverlayName,
    fragmentData.overlay_name
  );
  const itemName = routeName ?? overlayName;
  let unreadCount = fragmentData.unread_count ?? 0;

  if (routeName === "LEADS_CENTER" && clearLCBadgeCount) {
    unreadCount = 0;
  }

  if (unreadCount === 0 && nullifyNoBadge) {
    return null;
  }

  return (
    <div {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}>
      <RelayFBMatchContainer
        match={fragmentData.badge}
        props={{ itemName, position, testid: dataTestId }}
        fallback={
          <BizKitLeftNavLinksSectionGenericBadge
            unreadCount={unreadCount}
            itemName={itemName}
            position={position}
            testid={undefined}
          />
        }
      />
    </div>
  );
};

BizKitLeftNavLinksSectionBadge.displayName = `${BizKitLeftNavLinksSectionBadge.name}`;

export default BizKitLeftNavLinksSectionBadge;
