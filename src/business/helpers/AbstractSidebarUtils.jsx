// __d(
//   "AbstractSidebarUtils",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       var b,
//         c = a.nativeEvent instanceof MouseEvent ? a.nativeEvent : null;
//       a = a.nativeEvent instanceof KeyboardEvent ? a.nativeEvent : null;
//       b = (b = c) != null ? b : a;
//       a = (c == null ? void 0 : c.button) === 0;
//       c =
//         (b == null ? void 0 : b.altKey) ||
//         (b == null ? void 0 : b.ctrlKey) ||
//         (b == null ? void 0 : b.metaKey) ||
//         (b == null ? void 0 : b.shiftKey);
//       return a && !c;
//     }
//     f.isRegularActivationEvent = a;
//   },
//   66
// );

function isRegularActivationEvent(event: React.SyntheticEvent): boolean {
  const mouseEvent =
    event.nativeEvent instanceof MouseEvent ? event.nativeEvent : null;
  const keyboardEvent =
    event.nativeEvent instanceof KeyboardEvent ? event.nativeEvent : null;
  const nativeEvent = mouseEvent ?? keyboardEvent;

  const isLeftClick = mouseEvent?.button === 0;
  const hasModifierKey =
    nativeEvent?.altKey ||
    nativeEvent?.ctrlKey ||
    nativeEvent?.metaKey ||
    nativeEvent?.shiftKey;

  return isLeftClick && !hasModifierKey;
}

export { isRegularActivationEvent };
