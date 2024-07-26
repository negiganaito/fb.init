// __d(
//   "asyncParams",
//   [],
//   function (a, b, c, d, e, f) {
//     var g = {};
//     function a(a, b) {
//       g[a] = b;
//     }
//     function b() {
//       return g;
//     }
//     f.add = a;
//     f.get = b;
//   },
//   66
// );

// asyncParams.ts

type AsyncParams = Record<string, any>;

const asyncParams: AsyncParams = {};

function add(key: string, value: any): void {
  asyncParams[key] = value;
}

function get(): AsyncParams {
  return asyncParams;
}

export { add, get };
