// __d(
//   "CometRouteMatch",
//   [
//     "ConstUriUtils",
//     "getCometRouteKey",
//     "normalizeCometRouterUrl",
//     "useCurrentRoute",
//     "useHostedRoute",
//     "useParentRoute",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = function () {
//       return !1;
//     };
//     function i(a, b) {
//       return a == null
//         ? h
//         : function (c) {
//             return b(c, a);
//           };
//     }
//     function j(a, b) {
//       return (
//         a != null &&
//         b != null &&
//         c("normalizeCometRouterUrl")(a) === c("normalizeCometRouterUrl")(b)
//       );
//     }
//     function k(a, b) {
//       return (
//         a != null &&
//         b != null &&
//         j(
//           (a = d("ConstUriUtils").getUri(a)) == null ? void 0 : a.getPath(),
//           (a = d("ConstUriUtils").getUri(b)) == null ? void 0 : a.getPath()
//         )
//       );
//     }
//     f = function (a, b) {
//       return c("getCometRouteKey")(a) === c("getCometRouteKey")(b);
//     };
//     var l = function (a, b) {
//         return j(a, b.url);
//       },
//       m = function (a, b) {
//         return k(a, b.url);
//       },
//       n = function (a, b) {
//         return k(a, (a = b.canonicalUrl) != null ? a : b.url);
//       };
//     n = {
//       canonicalPathMatchFunction: n,
//       pathMatchFunction: m,
//       routeMatchFunction: f,
//       urlMatchFunction: l,
//     };
//     function a(a) {
//       var b = c("useCurrentRoute")();
//       return i(b, a);
//     }
//     function b(a) {
//       var b = c("useHostedRoute")();
//       return i(b, a);
//     }
//     function e(a) {
//       var b = c("useParentRoute")();
//       return i(b, a);
//     }
//     g.MatchFunctions = n;
//     g.useCurrentRouteMatcher = a;
//     g.useHostedRouteMatcher = b;
//     g.useParentRouteMatcher = e;
//   },
//   98
// );

import { getUri } from "ConstUriUtils";
import { getCometRouteKey } from "getCometRouteKey";
import { normalizeCometRouterUrl } from "normalizeCometRouterUrl";
import { useCurrentRoute } from "useCurrentRoute";
import { useHostedRoute } from "useHostedRoute";
import { useParentRoute } from "useParentRoute";

const alwaysFalse = (): boolean => false;

function createMatchFunction<T>(
  route: T | null | undefined,
  matchFunction: (route: T, matchArg: T) => boolean
): (matchArg: T | null | undefined) => boolean {
  if (route == null) {
    return alwaysFalse;
  }
  return (matchArg: T | null | undefined): boolean => {
    if (matchArg == null) {
      return false;
    }
    return matchFunction(route, matchArg);
  };
}

function isNormalizedUrlEqual(
  url1: string | null | undefined,
  url2: string | null | undefined
): boolean {
  return (
    url1 != null &&
    url2 != null &&
    normalizeCometRouterUrl(url1) === normalizeCometRouterUrl(url2)
  );
}

function isPathEqual(
  url1: string | null | undefined,
  url2: string | null | undefined
): boolean {
  return (
    url1 != null &&
    url2 != null &&
    isNormalizedUrlEqual(
      getUri(url1)?.getPath() ?? null,
      getUri(url2)?.getPath() ?? null
    )
  );
}

const routeMatchFunction = (route1: any, route2: any): boolean => {
  return getCometRouteKey(route1) === getCometRouteKey(route2);
};

const urlMatchFunction = (
  url: string | null | undefined,
  route: { url: string | null | undefined }
): boolean => {
  return isNormalizedUrlEqual(url, route.url);
};

const pathMatchFunction = (
  url: string | null | undefined,
  route: { url: string | null | undefined }
): boolean => {
  return isPathEqual(url, route.url);
};

const canonicalPathMatchFunction = (
  url: string | null | undefined,
  route: { url: string | null | undefined; canonicalUrl?: string | null }
): boolean => {
  return isPathEqual(url, route.canonicalUrl ?? route.url);
};

const MatchFunctions = {
  canonicalPathMatchFunction,
  pathMatchFunction,
  routeMatchFunction,
  urlMatchFunction,
};

function useCurrentRouteMatcher<T>(
  matchFunction: (route: T, matchArg: T | null | undefined) => boolean
): (matchArg: T | null | undefined) => boolean {
  const currentRoute = useCurrentRoute<T>();
  return createMatchFunction(currentRoute, matchFunction);
}

function useHostedRouteMatcher<T>(
  matchFunction: (route: T, matchArg: T | null | undefined) => boolean
): (matchArg: T | null | undefined) => boolean {
  const hostedRoute = useHostedRoute<T>();
  return createMatchFunction(hostedRoute, matchFunction);
}

function useParentRouteMatcher<T>(
  matchFunction: (route: T, matchArg: T | null | undefined) => boolean
): (matchArg: T | null | undefined) => boolean {
  const parentRoute = useParentRoute<T>();
  return createMatchFunction(parentRoute, matchFunction);
}

export {
  MatchFunctions,
  useCurrentRouteMatcher,
  useHostedRouteMatcher,
  useParentRouteMatcher,
};
