// __d(
//   "BizKitNavigationOverlayName",
//   [],
//   function (a, b, c, d, e, f) {
//     a = Object.freeze({
//       MORE_TOOLS: "MORE_TOOLS",
//       ACTIVITIES_LOG: "ACTIVITIES_LOG",
//       GLOBAL_SEARCH: "GLOBAL_SEARCH",
//       ACCOUNT_SWITCHER: "ACCOUNT_SWITCHER",
//     });
//     f["default"] = a;
//   },
//   66
// );

// BizKitNavigationOverlayName.ts

export const BizKitNavigationOverlayName = Object.freeze({
  MORE_TOOLS: "MORE_TOOLS",
  ACTIVITIES_LOG: "ACTIVITIES_LOG",
  GLOBAL_SEARCH: "GLOBAL_SEARCH",
  ACCOUNT_SWITCHER: "ACCOUNT_SWITCHER",
} as const);

export type BizKitNavigationOverlayNameType =
  (typeof BizKitNavigationOverlayName)[keyof typeof BizKitNavigationOverlayName];
