// __d(
//   "getAssetsByType",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       return {
//         adAccount: a.filter(function (a) {
//           return a.type === "AD_ACCOUNT";
//         }),
//         appAccount: a.filter(function (a) {
//           return a.type === "APP";
//         }),
//         igAccount: a.filter(function (a) {
//           return a.type === "INSTAGRAM_ACCOUNT_V2";
//         }),
//         pageAccount: a.filter(function (a) {
//           return a.type === "PAGE";
//         }),
//         wabAccount: a.filter(function (a) {
//           return a.type === "WHATSAPP_BUSINESS_ACCOUNT";
//         }),
//       };
//     }
//     f["default"] = a;
//   },
//   66
// );

// getAssetsByType.ts

type Asset = {
  type: string;
  [key: string]: any;
};

type AssetsByType = {
  adAccount: Asset[];
  appAccount: Asset[];
  igAccount: Asset[];
  pageAccount: Asset[];
  wabAccount: Asset[];
};

function getAssetsByType(assets: Asset[]): AssetsByType {
  return {
    adAccount: assets.filter((asset) => asset.type === "AD_ACCOUNT"),
    appAccount: assets.filter((asset) => asset.type === "APP"),
    igAccount: assets.filter((asset) => asset.type === "INSTAGRAM_ACCOUNT_V2"),
    pageAccount: assets.filter((asset) => asset.type === "PAGE"),
    wabAccount: assets.filter(
      (asset) => asset.type === "WHATSAPP_BUSINESS_ACCOUNT"
    ),
  };
}

export default getAssetsByType;
