// __d(
//   "absoluteToRelative",
//   ["memoizeStringOnly"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = c("memoizeStringOnly")(function (a) {
//       return a.replace(/^https?:\/\/[^\/]+/i, "");
//     });
//     function a(a) {
//       return h((a = a) != null ? a : "#");
//     }
//     g["default"] = a;
//   },
//   98
// );

// absoluteToRelative.ts

import memoizeStringOnly from "memoizeStringOnly";

const memoizedConvert = memoizeStringOnly((url: string) => {
  return url.replace(/^https?:\/\/[^\/]+/i, "");
});

function absoluteToRelative(url: string): string {
  return memoizedConvert(url != null ? url : "#");
}

export default absoluteToRelative;
