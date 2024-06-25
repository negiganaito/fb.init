__d(
  "useBizKitPageNullable",
  ["BizKitMultiAssetSelectionGating.entrypointutils", "useBizKitAssets"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a() {
      var a = c("useBizKitAssets")(["PAGE"]);
      return a.length === 1 ||
        (d(
          "BizKitMultiAssetSelectionGating.entrypointutils"
        ).getCanSelectMultipleAssetsInSelector() &&
          a.length > 1)
        ? a[0].id
        : null;
    }
    g["default"] = a;
  },
  98
); /*FB_PKG_DELIM*/

import { getCanSelectMultipleAssetsInSelector } from "BizKitMultiAssetSelectionGating.entrypointutils";
import useBizKitAssets from "useBizKitAssets";

function useBizKitPageNullable(): string | null {
  const assets = useBizKitAssets(["PAGE"]);

  if (
    assets.length === 1 ||
    (getCanSelectMultipleAssetsInSelector() && assets.length > 1)
  ) {
    return assets[0].id;
  }

  return null;
}

export default useBizKitPageNullable;
