// __d(
//   "CometRouteURL",
//   [
//     "ConstUriUtils",
//     "absoluteToRelative",
//     "memoizeStringOnly",
//     "useCurrentRoute",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = c("memoizeStringOnly")(function (a) {
//         a = d("ConstUriUtils").getUri(a);
//         return a != null ? a.getPath() : null;
//       }),
//       i = c("memoizeStringOnly")(function (a) {
//         a = d("ConstUriUtils").getUri(a);
//         return a != null ? Object.fromEntries(a.getQueryParams()) : null;
//       });
//     function j() {
//       var a;
//       if (window.location.href == null) return null;
//       a =
//         (a = d("ConstUriUtils").getUri(window.location.href)) == null
//           ? void 0
//           : a.toString();
//       return a != null ? c("absoluteToRelative")(a) : null;
//     }
//     function a() {
//       var a = j();
//       return a != null ? i(a) : null;
//     }
//     function k() {
//       var a = c("useCurrentRoute")();
//       if (a != null) {
//         var b;
//         return (b = a.canonicalUrl) != null ? b : a.url;
//       } else {
//         return (b = j()) != null ? b : "";
//       }
//     }
//     function b() {
//       var a = k();
//       return (a = h(a)) != null ? a : "";
//     }
//     function e() {
//       var a = k();
//       return (a = i(a)) != null ? a : {};
//     }
//     g.getWindowURL = j;
//     g.getWindowURLParams = a;
//     g.useRouteURL = k;
//     g.useRouteURLPath = b;
//     g.useRouteURLParams = e;
//   },
//   98
// );

// CometRouteURL.ts

import { getUri } from "ConstUriUtils";
import { absoluteToRelative } from "absoluteToRelative";
import memoizeStringOnly from "memoizeStringOnly";
import useCurrentRoute from "useCurrentRoute";

const memoizedGetPath = memoizeStringOnly((url: string) => {
  const uri = getUri(url);
  return uri != null ? uri.getPath() : null;
});

const memoizedGetQueryParams = memoizeStringOnly((url: string) => {
  const uri = getUri(url);
  return uri != null ? Object.fromEntries(uri.getQueryParams()) : null;
});

function getWindowURL(): string | null {
  if (window.location.href == null) return null;
  const uri = getUri(window.location.href);
  return uri != null ? absoluteToRelative(uri.toString()) : null;
}

function getWindowURLParams(): Record<string, any> | null {
  const url = getWindowURL();
  return url != null ? memoizedGetQueryParams(url) : null;
}

function useRouteURL(): string {
  const currentRoute = useCurrentRoute();
  if (currentRoute != null) {
    return currentRoute.canonicalUrl ?? currentRoute.url;
  } else {
    return getWindowURL() ?? "";
  }
}

function useRouteURLPath(): string {
  const url = useRouteURL();
  return memoizedGetPath(url) ?? "";
}

function useRouteURLParams(): Record<string, any> {
  const url = useRouteURL();
  return memoizedGetQueryParams(url) ?? {};
}

export {
  getWindowURL,
  getWindowURLParams,
  useRouteURL,
  useRouteURLPath,
  useRouteURLParams,
};
