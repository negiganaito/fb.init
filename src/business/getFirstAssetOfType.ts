// __d(
//   "getFirstAssetOfType",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a, b) {
//       return a.find(function (a) {
//         return a.type === b;
//       });
//     }
//     f["default"] = a;
//   },
//   66
// );

// getFirstAssetOfType.ts

type Asset = {
  type: string;
  [key: string]: any;
};

function getFirstAssetOfType(assets: Asset[], type: string): Asset | undefined {
  return assets.find((asset) => asset.type === type);
}

export default getFirstAssetOfType;
