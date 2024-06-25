// __d(
//   "useBusinessCometLeftNavParams",
//   [
//     "getIsEligibleForRemovePageDependencyBadging.entrypointutils",
//     "getLocalScopesQueryParam",
//     "useBizKitSelectedAssets",
//     "useGlobalScope",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a() {
//       var a = c("useGlobalScope")();
//       a =
//         (a == null ? void 0 : a.type) === "BUSINESS"
//           ? a == null
//             ? void 0
//             : a.id
//           : null;
//       var b = c("useBizKitSelectedAssets")();
//       return {
//         businessID: a,
//         localScopeID: b.assetID,
//         localScopes: d(
//           "getIsEligibleForRemovePageDependencyBadging.entrypointutils"
//         ).getIsEligibleForRemovePageDependencyBadging()
//           ? c("getLocalScopesQueryParam")(b.assets)
//           : null,
//         localScopeType: b.assetType,
//       };
//     }
//     g["default"] = a;
//   },
//   98
// );

import { getIsEligibleForRemovePageDependencyBadging } from "getIsEligibleForRemovePageDependencyBadging.entrypointutils";
import getLocalScopesQueryParam from "getLocalScopesQueryParam";
import useBizKitSelectedAssets from "useBizKitSelectedAssets";
import useGlobalScope from "useGlobalScope";

interface BusinessCometLeftNavParams {
  businessID: string | null;
  localScopeID: string | undefined;
  localScopes: string | null;
  localScopeType: string | undefined;
}

function useBusinessCometLeftNavParams(): BusinessCometLeftNavParams {
  const globalScope = useGlobalScope();
  const businessID = globalScope?.type === "BUSINESS" ? globalScope?.id : null;
  const selectedAssets = useBizKitSelectedAssets();

  return {
    businessID,
    localScopeID: selectedAssets.assetID,
    localScopes: getIsEligibleForRemovePageDependencyBadging()
      ? getLocalScopesQueryParam(selectedAssets.assets)
      : null,
    localScopeType: selectedAssets.assetType,
  };
}

export default useBusinessCometLeftNavParams;
