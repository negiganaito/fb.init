__d(
  "BizKitLeftNavGating",
  ["BMToMBSConsoldationGating"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a() {
      return d("BMToMBSConsoldationGating").getEligibleForBMToMBSLeftNav();
    }
    g.getShouldShowLeftNavBMRedesign = a;
  },
  98
);

import BMToMBSConsoldationGating from "BMToMBSConsoldationGating";

function getShouldShowLeftNavBMRedesign(): boolean {
  return BMToMBSConsoldationGating.getEligibleForBMToMBSLeftNav();
}

export { getShouldShowLeftNavBMRedesign };
