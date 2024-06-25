__d(
  "useStyleXTransitionSingle",
  ["useStyleXTransition"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    function a(a, b) {
      a = c("useStyleXTransition")(
        a != null ? [a] : [],
        function () {
          return 0;
        },
        b
      );
      return a[0];
    }
    g["default"] = a;
  },
  98
);

import useStyleXTransition, {
  UseStyleXTransitionProps,
} from "useStyleXTransition";

interface UseStyleXTransitionSingleProps extends UseStyleXTransitionProps {
  base?: any[];
  enter?: any[];
  leave?: any[];
  durationIn?: number;
  durationOut?: number;
  onEnter?: () => void;
  onEnterComplete?: () => void;
  onLeave?: () => void;
  onLeaveComplete?: () => void;
}

function useStyleXTransitionSingle(
  item: any | null,
  options: UseStyleXTransitionSingleProps
): any {
  const transition = useStyleXTransition(
    item != null ? [item] : [],
    () => 0,
    options
  );
  return transition[0];
}

export default useStyleXTransitionSingle;
