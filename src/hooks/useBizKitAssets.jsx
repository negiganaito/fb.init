// __d(
//   "useBizKitAssets",
//   ["react", "useBizKitSelectedAssets"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useMemo,
//       j = [];
//     function a(a) {
//       var b = c("useBizKitSelectedAssets")(),
//         d = b.assets;
//       return i(
//         function () {
//           return a.length > 0
//             ? d.filter(function (b) {
//                 return a.includes(b.type);
//               })
//             : j;
//         },
//         [a, d]
//       );
//     }
//     g["default"] = a;
//   },
//   98
// );

// useBizKitAssets.ts

import { useMemo } from "react";
import useBizKitSelectedAssets from "useBizKitSelectedAssets";

type Asset = {
  type: string;
  [key: string]: any;
};

function useBizKitAssets(assetTypes: string[]): Asset[] {
  const { assets } = useBizKitSelectedAssets();

  return useMemo(() => {
    return assetTypes.length > 0
      ? assets.filter((asset) => assetTypes.includes(asset.type))
      : [];
  }, [assetTypes, assets]);
}

export default useBizKitAssets;
