// __d(
//   "normalizeCometRouterUrl",
//   [
//     "CometUrlTransformsConfig",
//     "absoluteToRelative",
//     "isCometRouterUrl",
//     "memoizeStringOnly",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = (function () {
//       var a = c("CometUrlTransformsConfig").should_remove_trailing_slash;
//       return a ? [c("absoluteToRelative"), i, j] : [c("absoluteToRelative"), j];
//     })();
//     function i(a) {
//       return a[a.length - 1] === "/" ? a.substring(0, a.length - 1) : a;
//     }
//     function j(a) {
//       return a[0] !== "/" ? "/" + a : a;
//     }
//     a = c("memoizeStringOnly")(function (a) {
//       return !c("isCometRouterUrl")(a)
//         ? a
//         : h.reduce(function (a, b) {
//             return b(a);
//           }, a);
//     });
//     g["default"] = a;
//   },
//   98
// );

import CometUrlTransformsConfig from "CometUrlTransformsConfig";
import absoluteToRelative from "absoluteToRelative";
import isCometRouterUrl from "isCometRouterUrl";
import memoizeStringOnly from "memoizeStringOnly";

const transformFunctions = (function () {
  const shouldRemoveTrailingSlash =
    CometUrlTransformsConfig.should_remove_trailing_slash;
  return shouldRemoveTrailingSlash
    ? [absoluteToRelative, removeTrailingSlash, ensureLeadingSlash]
    : [absoluteToRelative, ensureLeadingSlash];
})();

function removeTrailingSlash(url: string): string {
  return url[url.length - 1] === "/" ? url.substring(0, url.length - 1) : url;
}

function ensureLeadingSlash(url: string): string {
  return url[0] !== "/" ? "/" + url : url;
}

const normalizeCometRouterUrl = memoizeStringOnly(function (
  url: string
): string {
  if (!isCometRouterUrl(url)) {
    return url;
  }

  return transformFunctions.reduce(
    (currentUrl, transformFunction) => transformFunction(currentUrl),
    url
  );
});

export default normalizeCometRouterUrl;
