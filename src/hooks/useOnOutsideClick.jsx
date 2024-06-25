// __d(
//   "useOnOutsideClick",
//   [
//     "HiddenSubtreePassiveContext",
//     "pointerEventDistance",
//     "react",
//     "setTimeout",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     b = h || d("react");
//     var i = b.useContext,
//       j = b.useEffect,
//       k = b.useRef;
//     function a(a, b) {
//       var e = k(null),
//         f = i(c("HiddenSubtreePassiveContext")),
//         g = k(null);
//       j(
//         function () {
//           var h = e.current;
//           if (a === null || h == null) return;
//           var i = b || {},
//             j = i.isTargetEligible;
//           i = i.triggerOutsideClickOnDrag;
//           var k = i === void 0 ? !1 : i;
//           function l(a) {
//             return (
//               a instanceof Node &&
//               h instanceof Node &&
//               !(h == null ? void 0 : h.contains(a)) &&
//               (j == null || j(a))
//             );
//           }
//           function m(a) {
//             if (a.isPrimary) {
//               var b = l(a.target);
//               b && (g.current = a);
//             }
//           }
//           function n(b) {
//             var c = l(b.target);
//             if (g.current != null && c && b.isPrimary) {
//               c = d("pointerEventDistance").isWithinThreshold(g.current, b);
//               (c || k) && (a == null ? void 0 : a(b));
//             }
//             g.current = null;
//           }
//           function o(b) {
//             l(b.target) && (a == null ? void 0 : a(b));
//           }
//           var p = "PointerEvent" in window,
//             q = !1;
//           function r() {
//             q ||
//               (p
//                 ? (document.addEventListener("pointerup", n),
//                   document.addEventListener("pointerdown", m))
//                 : document.addEventListener("click", o)),
//               (q = !0);
//           }
//           function s() {
//             q &&
//               (p
//                 ? (document.removeEventListener("pointerup", n),
//                   document.removeEventListener("pointerdown", m))
//                 : document.removeEventListener("click", o)),
//               (q = !1);
//           }
//           i = f.getCurrentState();
//           i.hiddenOrBackgrounded || r();
//           var t = f.subscribeToChanges(function (a) {
//             a.hiddenOrBackgrounded
//               ? c("setTimeout")(function () {
//                   s();
//                 }, 0)
//               : r();
//           });
//           return function () {
//             t.remove(), s();
//           };
//         },
//         [a, f, b]
//       );
//       return e;
//     }
//     g["default"] = a;
//   },
//   98
// );

// useOnOutsideClick.ts

import { useContext, useEffect, useRef, MutableRefObject } from "react";
import { HiddenSubtreePassiveContext } from "HiddenSubtreePassiveContext";
import { pointerEventDistance } from "pointerEventDistance";
import { setTimeout } from "setTimeout";

type IsTargetEligible = (target: EventTarget | null) => boolean;

interface Options {
  isTargetEligible?: IsTargetEligible;
  triggerOutsideClickOnDrag?: boolean;
}

function useOnOutsideClick(
  onOutsideClick: (event: MouseEvent | PointerEvent) => void | null,
  options?: Options
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  const hiddenSubtreeContext = useContext(HiddenSubtreePassiveContext);
  const pointerDownEvent = useRef<PointerEvent | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (onOutsideClick === null || element == null) return;

    const { isTargetEligible, triggerOutsideClickOnDrag = false } =
      options || {};

    function isOutsideClick(target: EventTarget | null): boolean {
      return (
        target instanceof Node &&
        element instanceof Node &&
        !element.contains(target) &&
        (isTargetEligible == null || isTargetEligible(target))
      );
    }

    function handlePointerDown(event: PointerEvent): void {
      if (event.isPrimary) {
        const isOutside = isOutsideClick(event.target);
        if (isOutside) {
          pointerDownEvent.current = event;
        }
      }
    }

    function handlePointerUp(event: PointerEvent): void {
      const isOutside = isOutsideClick(event.target);
      if (pointerDownEvent.current != null && isOutside && event.isPrimary) {
        const isWithinThreshold = pointerEventDistance.isWithinThreshold(
          pointerDownEvent.current,
          event
        );
        if (isWithinThreshold || triggerOutsideClickOnDrag) {
          onOutsideClick(event);
        }
      }
      pointerDownEvent.current = null;
    }

    function handleClick(event: MouseEvent): void {
      if (isOutsideClick(event.target)) {
        onOutsideClick(event);
      }
    }

    const supportsPointerEvents = "PointerEvent" in window;
    let isListening = false;

    function startListening() {
      if (!isListening) {
        if (supportsPointerEvents) {
          document.addEventListener("pointerup", handlePointerUp);
          document.addEventListener("pointerdown", handlePointerDown);
        } else {
          document.addEventListener("click", handleClick);
        }
        isListening = true;
      }
    }

    function stopListening() {
      if (isListening) {
        if (supportsPointerEvents) {
          document.removeEventListener("pointerup", handlePointerUp);
          document.removeEventListener("pointerdown", handlePointerDown);
        } else {
          document.removeEventListener("click", handleClick);
        }
        isListening = false;
      }
    }

    const hiddenState = hiddenSubtreeContext.getCurrentState();
    if (!hiddenState.hiddenOrBackgrounded) {
      startListening();
    }

    const unsubscribe = hiddenSubtreeContext.subscribeToChanges((state) => {
      if (state.hiddenOrBackgrounded) {
        setTimeout(() => {
          stopListening();
        }, 0);
      } else {
        startListening();
      }
    });

    return () => {
      unsubscribe.remove();
      stopListening();
    };
  }, [onOutsideClick, hiddenSubtreeContext, options]);

  return ref;
}

export default useOnOutsideClick;
