__d(
  "useBusinessCometCurrentTabNameIncludingReverseShim",
  ["BizKitReverseShimContext", "react", "useBusinessCometCurrentRouteName"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = (h || d("react")).useContext;
    function a() {
      var a = i(c("BizKitReverseShimContext"));
      a = a.reverseShimName;
      return (a = a) != null ? a : c("useBusinessCometCurrentRouteName")();
    }
    g["default"] = a;
  },
  98
);

import { useContext } from "react";
import BizKitReverseShimContext from "BizKitReverseShimContext";
import useBusinessCometCurrentRouteName from "useBusinessCometCurrentRouteName";

function useBusinessCometCurrentTabNameIncludingReverseShim(): string {
  const { reverseShimName } = useContext(BizKitReverseShimContext);
  return reverseShimName ?? useBusinessCometCurrentRouteName();
}

export default useBusinessCometCurrentTabNameIncludingReverseShim;
