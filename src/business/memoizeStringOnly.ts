// __d(
//   "memoizeStringOnly",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       var b = {};
//       return function (c) {
//         Object.prototype.hasOwnProperty.call(b, c) || (b[c] = a.call(this, c));
//         return b[c];
//       };
//     }
//     f["default"] = a;
//   },
//   66
// );

// memoizeStringOnly.ts

type MemoizedFunction<T> = (arg: string) => T;

function memoizeStringOnly<T>(func: (arg: string) => T): MemoizedFunction<T> {
  const cache: Record<string, T> = {};
  return function (arg: string): T {
    if (!Object.prototype.hasOwnProperty.call(cache, arg)) {
      cache[arg] = func.call(this, arg);
    }
    return cache[arg];
  };
}

export default memoizeStringOnly;
