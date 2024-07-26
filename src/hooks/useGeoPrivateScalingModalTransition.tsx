// __d(
//   "useGeoPrivateScalingModalTransition",
//   ["gkx", "useGeoTheme", "useStyleXTransitionSingle"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = 280,
//       i = 400,
//       j = c("gkx")("24835");
//     function a(a, b) {
//       var d = c("useGeoTheme")();
//       d = d.selectTransition;
//       var e = d({ duration: "slow", timing: "enter" });
//       d = d({ duration: "short", timing: "exit" });
//       a = c("useStyleXTransitionSingle")(a || null, {
//         base: k.base,
//         enter: [k.enter, e],
//         leave: [k.leave, d],
//         durationIn: i,
//         durationOut: h,
//         onEnterComplete: b,
//       });
//       return j ? a : null;
//     }
//     var k = {
//       base: { transform: "x9mn55f", $$css: !0 },
//       enter: { transform: "x3oybdh", $$css: !0 },
//       leave: { transform: "x9mn55f", $$css: !0 },
//     };
//     g["default"] = a;
//   },
//   98
// );

import gkx from "gkx";
import useGeoTheme from "useGeoTheme";
import useStyleXTransitionSingle from "useStyleXTransitionSingle";

const DURATION_IN = 400;
const DURATION_OUT = 280;
const IS_FEATURE_ENABLED = gkx("24835");

interface UseGeoPrivateScalingModalTransition {
  (isShown: boolean, onEnterComplete?: () => void): any;
}

const useGeoPrivateScalingModalTransition: UseGeoPrivateScalingModalTransition =
  (isShown, onEnterComplete) => {
    const { selectTransition } = useGeoTheme();

    const enterTransition = selectTransition({
      duration: "slow",
      timing: "enter",
    });
    const exitTransition = selectTransition({
      duration: "short",
      timing: "exit",
    });

    const transition = useStyleXTransitionSingle(isShown || null, {
      base: styles.base,
      enter: [styles.enter, enterTransition],
      leave: [styles.leave, exitTransition],
      durationIn: DURATION_IN,
      durationOut: DURATION_OUT,
      onEnterComplete,
    });

    return IS_FEATURE_ENABLED ? transition : null;
  };

const styles = {
  base: { transform: "x9mn55f", $$css: true },
  enter: { transform: "x3oybdh", $$css: true },
  leave: { transform: "x9mn55f", $$css: true },
};

export default useGeoPrivateScalingModalTransition;
