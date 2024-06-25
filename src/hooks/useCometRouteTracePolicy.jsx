// __d(
//   "useCometRouteTracePolicy",
//   ["CometRouterRouteTracePolicyContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext,
//       j = "comet.app";
//     function a() {
//       var a;
//       return (a = i(c("CometRouterRouteTracePolicyContext"))) != null ? a : j;
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useContext } from "react";
import CometRouterRouteTracePolicyContext from "CometRouterRouteTracePolicyContext";

const DEFAULT_ROUTE_TRACE_POLICY = "comet.app";

function useCometRouteTracePolicy(): string {
  const contextValue = useContext(CometRouterRouteTracePolicyContext);
  return contextValue ?? DEFAULT_ROUTE_TRACE_POLICY;
}

export default useCometRouteTracePolicy;
