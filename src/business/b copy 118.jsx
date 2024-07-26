__d(
  "memoizeStringOnly",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      var b = {};
      return function (c) {
        Object.prototype.hasOwnProperty.call(b, c) || (b[c] = a.call(this, c));
        return b[c];
      };
    }
    f["default"] = a;
  },
  66
);
