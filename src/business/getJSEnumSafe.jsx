__d(
  "getJSEnumSafe",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a, b) {
      if (b == null) return null;
      if (!Object.prototype.hasOwnProperty.call(a, b)) return null;
      b = b;
      return a[b];
    }
    f["default"] = a;
  },
  66
);

function getJSEnumSafe<T extends object, K extends keyof T>(
  enumObj: T,
  key: K | null | undefined
): T[K] | null {
  if (key == null) return null;
  if (!Object.prototype.hasOwnProperty.call(enumObj, key)) return null;
  return enumObj[key];
}

export default getJSEnumSafe;
