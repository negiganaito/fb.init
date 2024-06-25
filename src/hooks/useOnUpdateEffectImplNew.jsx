// __d(
//   "useOnUpdateEffectImplNew",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     b = h || d("react");
//     var i = b.useEffect,
//       j = b.useRef;
//     function a(a, b) {
//       var c = j(!1);
//       i(function () {
//         c.current = !0;
//         return function () {
//           c.current = !1;
//         };
//       }, []);
//       i(function () {
//         var b = !c.current;
//         c.current = !1;
//         if (b) return a();
//       }, b);
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useEffect, useRef } from "react";

function useOnUpdateEffect(effect: () => void, deps: any[]): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      return effect();
    }
    isFirstRender.current = false;
  }, deps);
}

export default useOnUpdateEffect;
