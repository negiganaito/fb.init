// __d(
//   "getCometRouteKey",
//   ["stableStringify"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = typeof WeakMap === "function" ? new WeakMap() : new Map();
//     function a(a) {
//       var b = h.get(a);
//       if (b != null) return b;
//       b = a.rootView.resource.getModuleId();
//       b = b + "||" + c("stableStringify")(a.rootView.props);
//       var d = a.hostableView;
//       if (d != null) {
//         var e = d.resource.getModuleId();
//         b = b + "||" + e + "||" + c("stableStringify")(d.props);
//       }
//       e = a.actorID;
//       e != null && (b = b + "||" + e);
//       h.set(a, b);
//       return b;
//     }
//     g["default"] = a;
//   },
//   98
// );

import stableStringify from "stableStringify";

type Resource = {
  getModuleId: () => string;
};

type View = {
  resource: Resource;
  props: Record<string, any>;
};

type HostableView = View | null;

interface Route {
  rootView: View;
  hostableView?: HostableView;
  actorID?: string;
}

const cache: WeakMap<Route, string> | Map<Route, string> =
  typeof WeakMap === "function" ? new WeakMap() : new Map();

function getCometRouteKey(route: Route): string {
  const cachedKey = cache.get(route);
  if (cachedKey != null) return cachedKey;

  let key = route.rootView.resource.getModuleId();
  key += `||${stableStringify(route.rootView.props)}`;

  const hostableView = route.hostableView;
  if (hostableView != null) {
    const moduleId = hostableView.resource.getModuleId();
    key += `||${moduleId}||${stableStringify(hostableView.props)}`;
  }

  const actorID = route.actorID;
  if (actorID != null) {
    key += `||${actorID}`;
  }

  cache.set(route, key);
  return key;
}

export default getCometRouteKey;
