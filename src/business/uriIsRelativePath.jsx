// __d(
//   "uriIsRelativePath",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       return (
//         !a.getProtocol() &&
//         !a.getDomain() &&
//         !a.getPort() &&
//         a.toString() !== ""
//       );
//     }
//     f["default"] = a;
//   },
//   66
// );

function uriIsRelativePath(uri) {
  return (
    !uri.getProtocol() &&
    !uri.getDomain() &&
    !uri.getPort() &&
    uri.toString() !== ""
  );
}

export default uriIsRelativePath;
