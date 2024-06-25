// __d(
//   "useBizWebGetRouteParams",
//   ["cr:1993187", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useMemo,
//       j = {};
//     function a() {
//       var a,
//         c = (a = b("cr:1993187")()) != null ? a : j;
//       return i(
//         function () {
//           c.routeName;
//           var a = babelHelpers.objectWithoutPropertiesLoose(c, ["routeName"]);
//           return babelHelpers["extends"]({}, a, { routeName: void 0 });
//         },
//         [c]
//       );
//     }
//     c = a;
//     g["default"] = c;
//   },
//   98
// );

// useBizWebGetRouteParams.ts

import { useMemo } from "react";
import useBusinessCometRouteParams from "useBusinessCometRouteParams";

const getRouteParams = useBusinessCometRouteParams || (() => ({}));

function useBizWebGetRouteParams() {
  const routeParams = getRouteParams();

  return useMemo(() => {
    const { routeName, ...restParams } = routeParams;
    return { ...restParams, routeName: undefined };
  }, [routeParams]);
}

export default useBizWebGetRouteParams;
