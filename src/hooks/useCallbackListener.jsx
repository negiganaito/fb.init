// __d(
//   "useCallbackListener",
//   ["react", "useOnUpdateEffect", "useShallowArrayEqualMemo"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     b = h || d("react");
//     var i = b.useEffect,
//       j = b.useRef;
//     function a(a) {
//       var b = j();
//       for (
//         var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1;
//         f < d;
//         f++
//       )
//         e[f - 1] = arguments[f];
//       var g = c("useShallowArrayEqualMemo")(e);
//       i(
//         function () {
//           b.current = a;
//         },
//         [a]
//       );
//       c("useOnUpdateEffect")(
//         function () {
//           b.current == null ? void 0 : b.current.apply(b, g);
//         },
//         [g]
//       );
//     }
//     g["default"] = a;
//   },
//   98
// );

import React, { useEffect, useRef } from "react";
import useOnUpdateEffect from "useOnUpdateEffect";
import useShallowArrayEqualMemo from "useShallowArrayEqualMemo";

function useCallbackListener(callback: Function, ...dependencies: any[]) {
  const callbackRef = useRef<Function | null>(null);
  const memoizedDependencies = useShallowArrayEqualMemo(dependencies);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useOnUpdateEffect(() => {
    callbackRef.current?.(...memoizedDependencies);
  }, [memoizedDependencies]);
}

export default useCallbackListener;
