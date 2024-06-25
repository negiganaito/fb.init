// __d(
//   "useStyleXTransition",
//   [
//     "differenceSets",
//     "mapMapToArray",
//     "mapSet",
//     "nullthrows",
//     "react",
//     "setImmediate",
//     "sortBy",
//     "useForceUpdate",
//     "useIsMountedRef",
//     "useStable",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     b = h || d("react");
//     var i = b.useCallback,
//       j = b.useEffect,
//       k = b.useLayoutEffect,
//       l = b.useRef;
//     e = window;
//     var m = e.clearTimeout,
//       n = e.requestAnimationFrame,
//       o = e.setTimeout;
//     function p() {
//       var a = c("useStable")(function () {
//         return new Map();
//       });
//       j(function () {
//         return function () {
//           return Array.from(a.values()).forEach(m);
//         };
//       }, []);
//       return a;
//     }
//     function q() {
//       var a = c("useForceUpdate")(),
//         b = c("useIsMountedRef")();
//       return c("useStable")(function () {
//         return function () {
//           b.current && a();
//         };
//       });
//     }
//     function a(a, b, d, e) {
//       var f = q(),
//         g = p(),
//         h = c("useStable")(function () {
//           return new Map();
//         }),
//         j = l(!0),
//         r = d.enter,
//         s = d.leave,
//         t = d.base,
//         u = d.duration,
//         v = u === void 0 ? 100 : u,
//         w = d.durationIn,
//         x = d.durationOut,
//         y = d.onEnter,
//         z = d.onLeave,
//         A = d.onEnterComplete,
//         B = d.onLeaveComplete,
//         C = i(
//           function (a, b, c) {
//             return {
//               item: b,
//               key: a,
//               order: c,
//               xstyle: [t, j.current && r],
//               style: { transitionDuration: ((b = w) != null ? b : v) + "ms" },
//             };
//           },
//           [t, r, w, v]
//         ),
//         D = new Map(
//           a.map(function (a, c) {
//             return [b(a), { item: a, order: c }];
//           })
//         ),
//         E = c("differenceSets")(new Set(D.keys()), new Set(h.keys())),
//         F = c("differenceSets")(new Set(h.keys()), new Set(D.keys())),
//         G = new Map();
//       u = Array.from(
//         c("mapSet")(F, function (a) {
//           a = c("nullthrows")(h.get(a));
//           a = a.order;
//           return a;
//         })
//       ).sort(function (a, b) {
//         return a - b;
//       });
//       u.forEach(function (b, c) {
//         b = b - c;
//         while (b < a.length) {
//           c = (c = G.get(b)) != null ? c : 0;
//           G.set(b, c + 1);
//           b += 1;
//         }
//       });
//       d = c("sortBy")(
//         [].concat(
//           c("mapMapToArray")(h, function (a) {
//             var b = a.key;
//             b = D.get(b);
//             if (b) {
//               return babelHelpers["extends"]({}, a, {
//                 item: b.item,
//                 order: b.order + ((b = G.get(b.order)) != null ? b : 0),
//               });
//             }
//             return a;
//           }),
//           Array.from(
//             c("mapSet")(E, function (a) {
//               var b = c("nullthrows")(D.get(a)),
//                 d = b.item;
//               b = b.order;
//               return C(a, d, b);
//             })
//           )
//         ),
//         function (a) {
//           return a.order;
//         }
//       );
//       k(function () {
//         if (e === !0) return;
//         a.forEach(function (a, d) {
//           var e,
//             i = b(a),
//             j = (e = h.get(i)) != null ? e : C(i, a, d);
//           E.has(i) &&
//             n(function () {
//               var b;
//               j.xstyle = [t, r];
//               m(g.get(i));
//               g.set(
//                 i,
//                 o(
//                   function () {
//                     A && A(a);
//                   },
//                   (b = w) != null ? b : v
//                 )
//               );
//               c("setImmediate")(function () {
//                 (j.xstyle = [t, r]), y && y(a), f();
//               });
//             });
//           j.item = a;
//           j.order = d + ((e = G.get(d)) != null ? e : 0);
//           h.set(i, j);
//         });
//         Array.from(F.values()).forEach(function (a) {
//           var b = h.get(a);
//           if (b == null) return;
//           var d = b.item;
//           if (b.status !== "leaving") {
//             var e;
//             b.status = "leaving";
//             b.style = { transitionDuration: ((e = x) != null ? e : v) + "ms" };
//             n(function () {
//               var e;
//               b.xstyle = [t, s];
//               m(g.get(a));
//               g.set(
//                 a,
//                 o(
//                   function () {
//                     h["delete"](a), B && B(d), f();
//                   },
//                   (e = x) != null ? e : v
//                 )
//               );
//               c("setImmediate")(function () {
//                 z && z(d), f();
//               });
//             });
//           }
//         });
//         j.current = !1;
//       });
//       return d;
//     }
//     g["default"] = a;
//   },
//   98
// );

import {
  differenceSets,
  mapMapToArray,
  mapSet,
  sortBy,
  nullthrows,
  useForceUpdate,
  useIsMountedRef,
  useStable,
  setImmediate,
} from "your-dependencies"; // Adjust the import path accordingly
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const { clearTimeout, requestAnimationFrame, setTimeout } = window;

function useTimersMap(): Map<any, any> {
  const timers = useStable(() => new Map());
  useEffect(() => {
    return () =>
      Array.from(timers.values()).forEach((timeoutId: any) =>
        clearTimeout(timeoutId)
      );
  }, []);
  return timers;
}

function useUpdateIfMounted(): () => void {
  const forceUpdate = useForceUpdate();
  const isMountedRef = useIsMountedRef();
  return useStable(() => {
    return () => {
      if (isMountedRef.current) {
        forceUpdate();
      }
    };
  });
}

interface TransitionConfig<T> {
  enter: string;
  leave: string;
  base: string;
  duration?: number;
  durationIn?: number;
  durationOut?: number;
  onEnter?: (item: T) => void;
  onLeave?: (item: T) => void;
  onEnterComplete?: (item: T) => void;
  onLeaveComplete?: (item: T) => void;
}

interface TransitionElement<T> {
  item: T;
  key: string;
  order: number;
  xstyle: string[];
  style: React.CSSProperties;
  status?: string;
}

export default function useStyleXTransition<T>(
  items: T[],
  keyExtractor: (item: T) => string,
  config: TransitionConfig<T>,
  isFirstMount: boolean = true
) {
  const updateIfMounted = useUpdateIfMounted();
  const timers = useTimersMap();
  const elementsMap = useStable(() => new Map<string, TransitionElement<T>>());
  const isFirstMountRef = useRef(true);

  const createElement = useCallback(
    (key: string, item: T, order: number): TransitionElement<T> => ({
      item,
      key,
      order,
      xstyle: [config.base, isFirstMountRef.current && config.enter],
      style: {
        transitionDuration: `${config.durationIn ?? config.duration ?? 100}ms`,
      },
    }),
    [config.base, config.enter, config.durationIn, config.duration]
  );

  const newElementsMap = new Map(
    items.map((item, index) => [keyExtractor(item), { item, order: index }])
  );
  const enteringKeys = differenceSets(
    new Set(newElementsMap.keys()),
    new Set(elementsMap.keys())
  );
  const leavingKeys = differenceSets(
    new Set(elementsMap.keys()),
    new Set(newElementsMap.keys())
  );

  const orderAdjustmentMap = new Map<number, number>();
  const leavingOrders = Array.from(
    mapSet(leavingKeys, (key) => nullthrows(elementsMap.get(key)).order)
  ).sort((a: any, b: any) => a - b);

  leavingOrders.forEach((order: any, index: number) => {
    order -= index;
    while (order < items.length) {
      const count = orderAdjustmentMap.get(order) ?? 0;
      orderAdjustmentMap.set(order, count + 1);
      order += 1;
    }
  });

  const transitions = sortBy(
    [
      ...mapMapToArray(elementsMap, (element) => {
        const newElement = newElementsMap.get(element.key);
        if (newElement) {
          return {
            ...element,
            item: newElement.item,
            order:
              newElement.order +
              (orderAdjustmentMap.get(newElement.order) ?? 0),
          };
        }
        return element;
      }),
      ...Array.from(
        mapSet(enteringKeys, (key) => {
          const newElement = nullthrows(newElementsMap.get(key));
          return createElement(key, newElement.item, newElement.order);
        })
      ),
    ],
    (element) => element.order
  );

  useLayoutEffect(() => {
    if (isFirstMount) return;
    items.forEach((item, index) => {
      const key = keyExtractor(item);
      let element = elementsMap.get(key) ?? createElement(key, item, index);

      if (enteringKeys.has(key)) {
        requestAnimationFrame(() => {
          element.xstyle = [config.base, config.enter];
          clearTimeout(timers.get(key));
          timers.set(
            key,
            setTimeout(() => {
              config.onEnterComplete && config.onEnterComplete(item);
            }, config.durationIn ?? config.duration ?? 100)
          );
          setImmediate(() => {
            element.xstyle = [config.base, config.enter];
            config.onEnter && config.onEnter(item);
            updateIfMounted();
          });
        });
      }

      element.item = item;
      element.order = index + (orderAdjustmentMap.get(index) ?? 0);
      elementsMap.set(key, element);
    });

    Array.from(leavingKeys.values()).forEach((key) => {
      const element = elementsMap.get(key);
      if (!element) return;

      const item = element.item;
      if (element.status !== "leaving") {
        element.status = "leaving";
        element.style = {
          transitionDuration: `${
            config.durationOut ?? config.duration ?? 100
          }ms`,
        };
        requestAnimationFrame(() => {
          element.xstyle = [config.base, config.leave];
          clearTimeout(timers.get(key));
          timers.set(
            key,
            setTimeout(() => {
              elementsMap.delete(key);
              config.onLeaveComplete && config.onLeaveComplete(item);
              updateIfMounted();
            }, config.durationOut ?? config.duration ?? 100)
          );
          setImmediate(() => {
            config.onLeave && config.onLeave(item);
            updateIfMounted();
          });
        });
      }
    });

    isFirstMountRef.current = false;
  });

  return transitions;
}
