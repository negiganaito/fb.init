// __d(
//   "getBizKitGetAssetTypes",
//   ["BusinessUnifiedScopingLocalSelectorUtils"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a(a) {
//       var b = [];
//       a.forEach(function (a) {
//         a = d(
//           "BusinessUnifiedScopingLocalSelectorUtils"
//         ).convertAssetEnumToType(a);
//         a != null && b.push(a);
//       });
//       return b;
//     }
//     g["default"] = a;
//   },
//   98
// );

import { convertAssetEnumToType } from "BusinessUnifiedScopingLocalSelectorUtils";

function getBizKitGetAssetTypes(assetEnums: string[]): string[] {
  const assetTypes: string[] = [];
  assetEnums.forEach((assetEnum) => {
    const assetType = convertAssetEnumToType(assetEnum);
    if (assetType != null) {
      assetTypes.push(assetType);
    }
  });
  return assetTypes;
}

export default getBizKitGetAssetTypes;
