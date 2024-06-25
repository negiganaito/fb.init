// __d(
//   "useDebouncedValue",
//   ["clearTimeout", "react", "setTimeout"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     b = h || d("react");
//     var i = b.useEffect,
//       j = b.useState;
//     function a(a, b) {
//       var d = j(a),
//         e = d[0],
//         f = d[1];
//       i(
//         function () {
//           var d = c("setTimeout")(function () {
//             return f(a);
//           }, b);
//           return function () {
//             return c("clearTimeout")(d);
//           };
//         },
//         [a, b]
//       );
//       return e;
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useEffect, useState } from "react";
import clearTimeout from "clearTimeout";
import setTimeout from "setTimeout";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouncedValue;
