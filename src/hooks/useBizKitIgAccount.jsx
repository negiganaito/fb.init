__d(
  "useBizKitIgAccount",
  ["useBizKitAssets"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a() {
      var a = c("useBizKitAssets")(["INSTAGRAM_ACCOUNT_V2"]);
      return a.length === 0 ? null : a[0].id;
    }
    g["default"] = a;
  },
  98
);

// useBizKitIgAccount.ts

import useBizKitAssets from "./useBizKitAssets";

function useBizKitIgAccount(): string | null {
  const assets = useBizKitAssets(["INSTAGRAM_ACCOUNT_V2"]);
  return assets.length === 0 ? null : assets[0].id;
}

export default useBizKitIgAccount;
