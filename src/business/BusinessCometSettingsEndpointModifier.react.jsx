// __d(
//   "BusinessCometSettingsEndpointModifier.react",
//   [
//     "BMToMBSConsoldationGating",
//     "BaseLinkEndpointModifierProvider.react",
//     "ConstUriUtils",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useCallback;
//     function a(a) {
//       a = a.children;
//       var b = d("BMToMBSConsoldationGating").getEnableBMSCIntegration(),
//         e = j(
//           function (a) {
//             var c = d("ConstUriUtils").getUri(a);
//             if (c == null) return a;
//             if (b === !0) {
//               return (c =
//                 (c = c.addQueryParam(
//                   "bm_redirect_migration",
//                   b ? "true" : "false"
//                 )) == null
//                   ? void 0
//                   : c.toString()) != null
//                 ? c
//                 : a;
//             }
//             return a;
//           },
//           [b]
//         );
//       return i.jsx(c("BaseLinkEndpointModifierProvider.react"), {
//         modifier: e,
//         children: a,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback } from "react";
import { getEnableBMSCIntegration } from "BMToMBSConsoldationGating";
import BaseLinkEndpointModifierProvider from "BaseLinkEndpointModifierProvider.react";
import { getUri } from "ConstUriUtils";

interface BusinessCometSettingsEndpointModifierProps {
  children: React.ReactNode;
}

const BusinessCometSettingsEndpointModifier: React.FC<
  BusinessCometSettingsEndpointModifierProps
> = ({ children }) => {
  const enableBMSCIntegration = getEnableBMSCIntegration();

  const modifier = useCallback(
    (url: string) => {
      const uri = getUri(url);
      if (!uri) return url;
      if (enableBMSCIntegration) {
        const updatedUri = uri.addQueryParam("bm_redirect_migration", "true");
        return updatedUri ? updatedUri.toString() : url;
      }
      return url;
    },
    [enableBMSCIntegration]
  );

  return (
    <BaseLinkEndpointModifierProvider modifier={modifier}>
      {children}
    </BaseLinkEndpointModifierProvider>
  );
};

BusinessCometSettingsEndpointModifier.displayName = `${BusinessCometSettingsEndpointModifier.name} [from ${module.id}]`;

export default BusinessCometSettingsEndpointModifier;
