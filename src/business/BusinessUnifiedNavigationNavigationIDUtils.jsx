// __d(
//   "BusinessUnifiedNavigationNavigationIDUtils",
//   ["Random"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function h() {
//       return c("Random").uint32().toString();
//     }
//     function i(a, b) {
//       return a.addQueryData("nav_id", b);
//     }
//     function a(a) {
//       var b = h();
//       return [b, i(a, b)];
//     }
//     g.getNavigationID = h;
//     g.getNavigationURIWithNavigationID = i;
//     g.getNavigationIDAndURIWithNavigationID = a;
//   },
//   98
// );

// BusinessUnifiedNavigationNavigationIDUtils.ts

import { Random } from "Random";

function getNavigationID(): string {
  return Random.uint32().toString();
}

function getNavigationURIWithNavigationID(
  uri: { addQueryData: (key: string, value: string) => any },
  navId: string
): any {
  return uri.addQueryData("nav_id", navId);
}

function getNavigationIDAndURIWithNavigationID(uri: {
  addQueryData: (key: string, value: string) => any;
}): [string, any] {
  const navId = getNavigationID();
  return [navId, getNavigationURIWithNavigationID(uri, navId)];
}

export {
  getNavigationID,
  getNavigationURIWithNavigationID,
  getNavigationIDAndURIWithNavigationID,
};
