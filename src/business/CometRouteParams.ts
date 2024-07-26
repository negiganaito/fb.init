// __d(
//   "CometRouteParams",
//   ["CometRouteURL", "useCurrentRoute"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function h() {
//       var a = c("useCurrentRoute")();
//       if (a != null) return a.params;
//       else {
//         return (a = d("CometRouteURL").getWindowURLParams()) != null ? a : {};
//       }
//     }
//     function a(a) {
//       return a(h());
//     }
//     g.useRouteParams = h;
//     g.useCometRefinedRouteParams = a;
//   },
//   98
// );

// CometRouteParams.ts

import { getWindowURLParams } from "CometRouteURL";
import useCurrentRoute from "useCurrentRoute";

function useRouteParams(): Record<string, any> {
  const currentRoute = useCurrentRoute();
  if (currentRoute != null) {
    return currentRoute.params;
  } else {
    const windowURLParams = getWindowURLParams();
    return windowURLParams != null ? windowURLParams : {};
  }
}

function useCometRefinedRouteParams(
  refineParams: (params: Record<string, any>) => any
): any {
  return refineParams(useRouteParams());
}

export { useRouteParams, useCometRefinedRouteParams };
