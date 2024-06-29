// __d(
//   "stableStringify",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function g(a) {
//       return (
//         a !== null && Object.prototype.toString.call(a) === "[object Object]"
//       );
//     }
//     function h(a, b) {
//       b === void 0 && (b = !1);
//       var c = Array.isArray(a),
//         d = g(a);
//       if (c || d) {
//         var e = Object.keys(a);
//         if (e.length) {
//           e = e.sort();
//           var f = [];
//           for (var i = 0; i < e.length; i++) {
//             var j = e[i],
//               k = a[j];
//             if (b && k == null && d) continue;
//             var l;
//             g(k) || Array.isArray(k) ? (l = h(k, b)) : (l = JSON.stringify(k));
//             f.push(j + ":" + l);
//           }
//           if (c) return "[" + f.join(",") + "]";
//           else return "{" + f.join(",") + "}";
//         }
//       }
//       return JSON.stringify(a);
//     }
//     f["default"] = h;
//   },
//   66
// );

function isObject(value: any): value is Record<string, any> {
  return (
    value !== null &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function stableStringify(value: any, ignoreNull: boolean = false): string {
  const isArray = Array.isArray(value);
  const isObj = isObject(value);

  if (isArray || isObj) {
    let keys = Object.keys(value);
    if (keys.length) {
      keys = keys.sort();
      const parts: string[] = [];

      for (const key of keys) {
        const item = value[key];
        if (ignoreNull && item == null && isObj) continue;

        let serializedItem: string;
        if (isObject(item) || Array.isArray(item)) {
          serializedItem = stableStringify(item, ignoreNull);
        } else {
          serializedItem = JSON.stringify(item);
        }

        parts.push(`${key}:${serializedItem}`);
      }

      return isArray ? `[${parts.join(",")}]` : `{${parts.join(",")}}`;
    }
  }

  return JSON.stringify(value);
}

export default stableStringify;
