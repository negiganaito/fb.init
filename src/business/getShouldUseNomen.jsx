// __d(
//   "getShouldUseNomen",
//   ["gkx"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a() {
//       return c("gkx")("22580");
//     }
//     g["default"] = a;
//   },
//   98
// );

import gkx from "gkx";

function getShouldUseNomen(): boolean {
  return gkx("22580");
}

export default getShouldUseNomen;
