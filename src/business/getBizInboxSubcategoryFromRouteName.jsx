// __d(
//   "getBizInboxSubcategoryFromRouteName",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       switch (a) {
//         case "CHAT_PLUGIN":
//           return "fb_business_inbox_chat_plugin_set_up";
//         default:
//           return null;
//       }
//     }
//     f.getBizInboxSubcategoryFromRouteName = a;
//   },
//   66
// );

export function getBizInboxSubcategoryFromRouteName(
  routeName: string
): string | null {
  switch (routeName) {
    case "CHAT_PLUGIN":
      return "fb_business_inbox_chat_plugin_set_up";
    default:
      return null;
  }
}
