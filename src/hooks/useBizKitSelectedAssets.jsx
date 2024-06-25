// __d(
//   "useBizKitSelectedAssets",
//   ["BizKitScopingContext", "getAssetsByType", "getFirstAssetOfType", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext;
//     function a() {
//       var a = i(c("BizKitScopingContext")),
//         b = a.assets,
//         d = a.setAssets;
//       a =
//         (a = (a = c("getFirstAssetOfType")(b, "PAGE")) != null ? a : b[0]) !=
//         null
//           ? a
//           : null;
//       return {
//         assetID: a == null ? void 0 : a.id,
//         assets: b,
//         assetsByType: c("getAssetsByType")(b),
//         assetType: a == null ? void 0 : a.type,
//         setAssets: d,
//         setSelectedLinkedAsset: function (a) {
//           d(a.assets);
//         },
//       };
//     }
//     g["default"] = a;
//   },
//   98
// );

// useBizKitSelectedAssets.ts

import { useContext } from "react";
import { BizKitScopingContext } from "BizKitScopingContext";
import { getAssetsByType } from "getAssetsByType";
import { getFirstAssetOfType } from "getFirstAssetOfType";

type Asset = {
  id: string;
  type: string;
  [key: string]: any;
};

type BizKitSelectedAssets = {
  assetID?: string;
  assets: Asset[];
  assetsByType: Record<string, Asset[]>;
  assetType?: string;
  setAssets: (assets: Asset[]) => void;
  setSelectedLinkedAsset: (assetData: { assets: Asset[] }) => void;
};

function useBizKitSelectedAssets(): BizKitSelectedAssets {
  const { assets, setAssets } = useContext(BizKitScopingContext);

  const firstAsset = getFirstAssetOfType(assets, "PAGE") ?? assets[0] ?? null;

  return {
    assetID: firstAsset?.id,
    assets,
    assetsByType: getAssetsByType(assets),
    assetType: firstAsset?.type,
    setAssets,
    setSelectedLinkedAsset: (assetData: { assets: Asset[] }) => {
      setAssets(assetData.assets);
    },
  };
}

export default useBizKitSelectedAssets;
