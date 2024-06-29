// __d(
//   "compareDOMOrder",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a, b) {
//       return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
//         ? -1
//         : 1;
//     }
//     f["default"] = a;
//   },
//   66
// );

function compareDOMOrder(a: Node, b: Node): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

export default compareDOMOrder;
