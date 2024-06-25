// __d(
//   "useGlobalScope",
//   ["BizKitScopingContext", "personalGlobalScope", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext;
//     function a() {
//       var a = i(c("BizKitScopingContext"));
//       a = a.globalScope;
//       return (a = a) != null ? a : d("personalGlobalScope").personalGlobalScope;
//     }
//     g["default"] = a;
//   },
//   98
// );

// useGlobalScope.ts

import { useContext } from "react";
import { BizKitScopingContext } from "BizKitScopingContext";
import { personalGlobalScope } from "personalGlobalScope";

function useGlobalScope() {
  const { globalScope } = useContext(BizKitScopingContext);
  return globalScope ?? personalGlobalScope;
}

export default useGlobalScope;
