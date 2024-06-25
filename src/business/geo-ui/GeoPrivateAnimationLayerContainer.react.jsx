// __d(
//   "GeoPrivateAnimationLayerContainer.react",
//   [
//     "GeoPrivateAnimationLayerContext",
//     "GeoPrivateMakeComponent",
//     "react",
//     "useShallowEqualMemo",
//     "useStyleXTransitionSingle",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useCallback,
//       k = b.useState,
//       l = 100,
//       m = 50,
//       n = 50;
//     function a(a) {
//       var b = a.children,
//         d = a.isLayerShown;
//       a.position;
//       a = k(!1);
//       var e = a[0],
//         f = a[1];
//       a = k(!1);
//       var g = a[0],
//         h = a[1];
//       a = j(function () {
//         f(!1);
//       }, []);
//       var p = j(function () {
//           h(!0);
//         }, []),
//         q = j(function () {
//           f(!0), h(!1);
//         }, []),
//         r = j(function () {
//           f(!1);
//         }, []);
//       d = c("useStyleXTransitionSingle")(d || null, {
//         base: [],
//         enter: o.transitionPlaceholder,
//         leave: o.transitionPlaceholder,
//         durationIn: n,
//         durationOut: l + m,
//         onEnter: a,
//         onEnterComplete: p,
//         onLeave: q,
//         onLeaveComplete: r,
//       });
//       a = c("useShallowEqualMemo")({
//         isAnimated: !0,
//         isLeaving: e,
//         isEntered: g,
//       });
//       return d
//         ? i.jsx(c("GeoPrivateAnimationLayerContext").Provider, {
//             value: a,
//             children: b,
//           })
//         : null;
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     var o = { transitionPlaceholder: { $$css: !0 } };
//     e = d("GeoPrivateMakeComponent").makeGeoComponent(
//       "GeoPrivateAnimationLayerContainer",
//       a
//     );
//     g["default"] = e;
//   },
//   98
// );

import React, { useCallback, useState } from "react";
import GeoPrivateAnimationLayerContext, {
  GeoPrivateAnimationLayerContextProps,
} from "GeoPrivateAnimationLayerContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import useShallowEqualMemo from "useShallowEqualMemo";
import useStyleXTransitionSingle from "useStyleXTransitionSingle";

interface GeoPrivateAnimationLayerContainerProps {
  children: React.ReactNode;
  isLayerShown: boolean;
  position?: string;
}

const TRANSITION_DURATION_IN = 50;
const TRANSITION_DURATION_OUT = 150; // 100 + 50

const GeoPrivateAnimationLayerContainer: React.FC<
  GeoPrivateAnimationLayerContainerProps
> = ({ children, isLayerShown, position }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  const onEnter = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const onEnterComplete = useCallback(() => {
    setIsEntered(true);
  }, []);

  const onLeave = useCallback(() => {
    setIsLeaving(true);
    setIsEntered(false);
  }, []);

  const onLeaveComplete = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const transitionStyles = useStyleXTransitionSingle(isLayerShown || null, {
    base: [],
    enter: styles.transitionPlaceholder,
    leave: styles.transitionPlaceholder,
    durationIn: TRANSITION_DURATION_IN,
    durationOut: TRANSITION_DURATION_OUT,
    onEnter,
    onEnterComplete,
    onLeave,
    onLeaveComplete,
  });

  const contextValue =
    useShallowEqualMemo<GeoPrivateAnimationLayerContextProps>({
      isAnimated: true,
      isLeaving,
      isEntered,
    });

  return transitionStyles ? (
    <GeoPrivateAnimationLayerContext.Provider value={contextValue}>
      {children}
    </GeoPrivateAnimationLayerContext.Provider>
  ) : null;
};

GeoPrivateAnimationLayerContainer.displayName =
  "GeoPrivateAnimationLayerContainer";

const styles = {
  transitionPlaceholder: { $$css: true },
};

export default makeGeoComponent(
  "GeoPrivateAnimationLayerContainer",
  GeoPrivateAnimationLayerContainer
);
