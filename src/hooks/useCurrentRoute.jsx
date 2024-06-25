// __d(
//   "useCurrentRoute",
//   ["CometRouterRouteContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext;
//     function a() {
//       return i(c("CometRouterRouteContext"));
//     }
//     g["default"] = a;
//   },
//   98
// );

// useCurrentRoute.ts

import { useContext } from "react";
import { CometRouterRouteContext } from "CometRouterRouteContext";

function useCurrentRoute() {
  return useContext(CometRouterRouteContext);
}

export default useCurrentRoute;
