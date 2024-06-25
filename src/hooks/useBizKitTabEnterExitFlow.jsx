// __d(
//   "useBizKitTabEnterExitFlow",
//   [
//     "BizKitNavigationReverseShimName",
//     "BizKitNavigationRouteName",
//     "RelayHooks",
//     "filterNulls",
//     "getJSEnumSafe",
//     "logBizKitTabItemEnterFlow",
//     "logBizKitTabItemExitFlow",
//     "react",
//     "useBizKitBaseLoggingData",
//     "useBizKitTabEnterExitFlow_navItem.graphql",
//     "useBizWebCurrentTabName",
//     "usePrevious",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h, i;
//     e = i || d("react");
//     var j = e.useEffect,
//       k = e.useMemo;
//     function a(a) {
//       var e = d("RelayHooks").useFragment(
//           h !== void 0
//             ? h
//             : (h = b("useBizKitTabEnterExitFlow_navItem.graphql")),
//           a
//         ),
//         f = k(
//           function () {
//             var a;
//             return c("filterNulls")(
//               (a =
//                 e == null
//                   ? void 0
//                   : e.map(function (a) {
//                       var b = c("getJSEnumSafe")(
//                         c("BizKitNavigationRouteName"),
//                         a.route_name
//                       );
//                       a = c("getJSEnumSafe")(
//                         c("BizKitNavigationReverseShimName"),
//                         a.reverse_shim_name
//                       );
//                       return (b = b) != null ? b : a;
//                     })) != null
//                 ? a
//                 : []
//             );
//           },
//           [e]
//         ),
//         g = c("useBizKitBaseLoggingData")(),
//         i = c("useBizWebCurrentTabName")(),
//         l = c("usePrevious")(i);
//       j(
//         function () {
//           if (l !== i) {
//             if (i != null) {
//               var a = f.includes(i) ? "GLOBAL_NAV" : "MORE_TOOLS_MENU";
//               d("logBizKitTabItemEnterFlow").logBizKitTabItemEnterFlow(
//                 i,
//                 a,
//                 -1,
//                 g
//               );
//             }
//             if (l != null) {
//               a = f.includes(l) ? "GLOBAL_NAV" : "MORE_TOOLS_MENU";
//               d("logBizKitTabItemExitFlow").logBizKitTabItemExitFlow(
//                 l,
//                 a,
//                 -1,
//                 g
//               );
//             }
//           }
//         },
//         [g, i, f, l]
//       );
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useEffect, useMemo } from "react";
import { useFragment } from "RelayHooks";
import filterNulls from "filterNulls";
import getJSEnumSafe from "getJSEnumSafe";
import {
  logBizKitTabItemEnterFlow,
  logBizKitTabItemExitFlow,
} from "logBizKitTabItemEnterExitFlow";
import useBizKitBaseLoggingData from "useBizKitBaseLoggingData";
import useBizKitTabEnterExitFlow_navItem from "useBizKitTabEnterExitFlow_navItem.graphql";
import useBizWebCurrentTabName from "useBizWebCurrentTabName";
import usePrevious from "usePrevious";
import {
  BizKitNavigationRouteName,
  BizKitNavigationReverseShimName,
} from "BizKitNavigationRouteName";

interface NavItem {
  route_name: string;
  reverse_shim_name: string;
}

function useBizKitTabEnterExitFlow(navItems: NavItem[]) {
  const fragmentData = useFragment(useBizKitTabEnterExitFlow_navItem, navItems);

  const routeNames = useMemo(() => {
    return filterNulls(
      fragmentData?.map((item) => {
        const routeName = getJSEnumSafe(
          BizKitNavigationRouteName,
          item.route_name
        );
        const reverseShimName = getJSEnumSafe(
          BizKitNavigationReverseShimName,
          item.reverse_shim_name
        );
        return routeName ?? reverseShimName;
      }) ?? []
    );
  }, [fragmentData]);

  const loggingData = useBizKitBaseLoggingData();
  const currentTabName = useBizWebCurrentTabName();
  const previousTabName = usePrevious(currentTabName);

  useEffect(() => {
    if (previousTabName !== currentTabName) {
      if (currentTabName != null) {
        const currentSource = routeNames.includes(currentTabName)
          ? "GLOBAL_NAV"
          : "MORE_TOOLS_MENU";
        logBizKitTabItemEnterFlow(
          currentTabName,
          currentSource,
          -1,
          loggingData
        );
      }
      if (previousTabName != null) {
        const previousSource = routeNames.includes(previousTabName)
          ? "GLOBAL_NAV"
          : "MORE_TOOLS_MENU";
        logBizKitTabItemExitFlow(
          previousTabName,
          previousSource,
          -1,
          loggingData
        );
      }
    }
  }, [loggingData, currentTabName, routeNames, previousTabName]);
}

export default useBizKitTabEnterExitFlow;
