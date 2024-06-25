// __d(
//   "useBizKitIGBusinessAsset",
//   ["useBizKitAssets"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a() {
//       var a = c("useBizKitAssets")(["INSTAGRAM_BUSINESS_ASSET"]);
//       return a.length === 0 ? null : a[0].id;
//     }
//     g["default"] = a;
//   },
//   98
// );

// useBizKitIGBusinessAsset.ts

import useBizKitAssets from "./useBizKitAssets";

function useBizKitIGBusinessAsset(): string | null {
  const assets = useBizKitAssets(["INSTAGRAM_BUSINESS_ASSET"]);
  return assets.length === 0 ? null : assets[0].id;
}

export default useBizKitIGBusinessAsset;
