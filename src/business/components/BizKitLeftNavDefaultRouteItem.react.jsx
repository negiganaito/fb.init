// __d(
//   "BizKitLeftNavDefaultRouteItem.react",
//   [
//     "BizKitConstants",
//     "BizKitLeftNavDefaultRouteItem_item.graphql",
//     "BizKitLeftNavSidebarBaseItem.react",
//     "BizKitLeftNavSidebarItemContext",
//     "BizKitNavigationRouteName",
//     "BizKitNavigationToolVisitMutation",
//     "BizKitWelcomeTourContext",
//     "FBLogger",
//     "GeoLinkRouterType",
//     "RelayHooks",
//     "getBizwebRecentlyViewedToolsEnabled",
//     "getJSEnumSafe",
//     "react",
//     "recoverableViolation",
//     "transformGlobalNavValue",
//     "useBizKitRedirect",
//     "useBusinessCometLeftNavParams",
//     "useGeoLinkRouterType",
//     "useLogBizKitNavItem",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react"));
//     e = i;
//     var k = e.useCallback,
//       l = e.useContext,
//       m = e.useEffect,
//       n = e.useState;
//     function a(a) {
//       var e = a.item;
//       a = a.onClick;
//       var f = a === void 0 ? null : a;
//       a = d("RelayHooks").useFragment(
//         h !== void 0
//           ? h
//           : (h = b("BizKitLeftNavDefaultRouteItem_item.graphql")),
//         e
//       );
//       e = n(function () {
//         return o();
//       });
//       var g = e[0],
//         i = e[1];
//       function o() {
//         return !1;
//       }
//       var p = c("getJSEnumSafe")(c("BizKitNavigationRouteName"), a.route_name);
//       p == null &&
//         c("recoverableViolation")(
//           "The route name should not be null",
//           d("BizKitConstants").BIZKIT_PROJECT_NAME
//         );
//       var q = a.uri;
//       m(
//         function () {
//           q == null &&
//             c("FBLogger")(d("BizKitConstants").BIZKIT_PROJECT_NAME).mustfix(
//               "The URI should not be null."
//             );
//         },
//         [q]
//       );
//       e = l(c("BizKitLeftNavSidebarItemContext"));
//       e = e.position;
//       var r = c("useBusinessCometLeftNavParams")();
//       r = r.businessID;
//       var s = a.bm_tool_name,
//         t = c("BizKitNavigationToolVisitMutation")(s, r);
//       s = c("useLogBizKitNavItem")({
//         name: p,
//         location: "GLOBAL_NAV",
//         position: e,
//       });
//       var u = s.onClick;
//       r = c("useBizKitRedirect")();
//       var v = r.redirectToUri;
//       e = l(c("BizKitWelcomeTourContext"));
//       var w = e.setHomeContext;
//       s = e.getNavRouteItemRef;
//       var x = c("useGeoLinkRouterType")();
//       r = k(
//         function (a, b) {
//           c("getBizwebRecentlyViewedToolsEnabled")() && t(),
//             u(b),
//             f == null ? void 0 : f(),
//             p === "LEADS_CENTER" && i(!0),
//             q != null &&
//               x === c("GeoLinkRouterType").Native &&
//               (v(q), b.preventDefault());
//         },
//         [x, u, f, v, p, t, q]
//       );
//       return j.jsx(c("BizKitLeftNavSidebarBaseItem.react"), {
//         href: (e = q) != null ? e : void 0,
//         item: a,
//         onActivate: r,
//         ref:
//           p === "HOME"
//             ? function (a) {
//                 return a != null && w(a);
//               }
//             : p != null
//             ? s(p)
//             : void 0,
//         value: d("transformGlobalNavValue").transformGlobalNavValue(p),
//         clearLCBadgeCount: g,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  BizKitConstants,
  BizKitLeftNavDefaultRouteItem_item,
  BizKitLeftNavSidebarBaseItem,
  BizKitLeftNavSidebarItemContext,
  BizKitNavigationRouteName,
  BizKitNavigationToolVisitMutation,
  BizKitWelcomeTourContext,
  FBLogger,
  GeoLinkRouterType,
  RelayHooks,
  getBizwebRecentlyViewedToolsEnabled,
  getJSEnumSafe,
  recoverableViolation,
  transformGlobalNavValue,
  useBizKitRedirect,
  useBusinessCometLeftNavParams,
  useGeoLinkRouterType,
  useLogBizKitNavItem,
} from "required-modules";

interface BizKitLeftNavDefaultRouteItemProps {
  item: any;
  onClick?: () => void;
}

const BizKitLeftNavDefaultRouteItem: React.FC<
  BizKitLeftNavDefaultRouteItemProps
> = ({ item, onClick }) => {
  const data = RelayHooks.useFragment(BizKitLeftNavDefaultRouteItem_item, item);
  const [clearLCBadgeCount, setClearLCBadgeCount] = useState(() => false);

  const routeName = getJSEnumSafe(BizKitNavigationRouteName, data.route_name);
  if (routeName == null) {
    recoverableViolation(
      "The route name should not be null",
      BizKitConstants.BIZKIT_PROJECT_NAME
    );
  }

  const uri = data.uri;
  useEffect(() => {
    if (uri == null) {
      FBLogger(BizKitConstants.BIZKIT_PROJECT_NAME).mustfix(
        "The URI should not be null."
      );
    }
  }, [uri]);

  const { position } = useContext(BizKitLeftNavSidebarItemContext);
  const { businessID } = useBusinessCometLeftNavParams();
  const bmToolName = data.bm_tool_name;
  const logToolVisit = BizKitNavigationToolVisitMutation(
    bmToolName,
    businessID
  );
  const { onClick: logNavItemClick } = useLogBizKitNavItem({
    name: routeName,
    location: "GLOBAL_NAV",
    position,
  });
  const { redirectToUri } = useBizKitRedirect();
  const { setHomeContext, getNavRouteItemRef } = useContext(
    BizKitWelcomeTourContext
  );
  const linkRouterType = useGeoLinkRouterType();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (getBizwebRecentlyViewedToolsEnabled()) {
        logToolVisit();
      }
      logNavItemClick(event);
      onClick?.();
      if (routeName === "LEADS_CENTER") {
        setClearLCBadgeCount(true);
      }
      if (uri != null && linkRouterType === GeoLinkRouterType.Native) {
        redirectToUri(uri);
        event.preventDefault();
      }
    },
    [
      linkRouterType,
      logNavItemClick,
      onClick,
      redirectToUri,
      routeName,
      logToolVisit,
      uri,
    ]
  );

  return (
    <BizKitLeftNavSidebarBaseItem
      href={uri ?? undefined}
      item={data}
      onActivate={handleClick}
      ref={
        routeName === "HOME"
          ? (element) => element != null && setHomeContext(element)
          : routeName != null
          ? getNavRouteItemRef(routeName)
          : undefined
      }
      value={transformGlobalNavValue(routeName)}
      clearLCBadgeCount={clearLCBadgeCount}
    />
  );
};

BizKitLeftNavDefaultRouteItem.displayName = `${BizKitLeftNavDefaultRouteItem.name}`;

export default BizKitLeftNavDefaultRouteItem;
