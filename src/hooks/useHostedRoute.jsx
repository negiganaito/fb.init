// __d(
//   "useHostedRoute",
//   ["CometRouterHostedRouteContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext;
//     function a() {
//       return i(c("CometRouterHostedRouteContext"));
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useContext } from "react";
import CometRouterHostedRouteContext from "CometRouterHostedRouteContext";

function useHostedRoute() {
  return useContext(CometRouterHostedRouteContext);
}

export default useHostedRoute;
