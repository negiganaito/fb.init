// __d(
//   "getLocalScopesQueryParam",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       return a.map(function (a) {
//         return { id: a.id, type: a.type };
//       });
//     }
//     f["default"] = a;
//   },
//   66
// );

// getLocalScopesQueryParam.ts

type Scope = {
  id: string;
  type: string;
};

function getLocalScopesQueryParam(
  scopes: Scope[]
): { id: string; type: string }[] {
  return scopes.map((scope) => ({
    id: scope.id,
    type: scope.type,
  }));
}

export default getLocalScopesQueryParam;
