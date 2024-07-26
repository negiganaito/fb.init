// __d(
//   "useGeoPrivateIneractiveRowPreventDefault",
//   ["GeoPrivatePreventDefaultOverrideContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useContext;
//     function a(a) {
//       var b = i(c("GeoPrivatePreventDefaultOverrideContext"));
//       return (b = b) != null ? b : !["label", "link"].includes(a);
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useContext } from "react";
import GeoPrivatePreventDefaultOverrideContext from "GeoPrivatePreventDefaultOverrideContext";

function useGeoPrivateInteractiveRowPreventDefault(
  elementType: string
): boolean {
  const contextValue = useContext(GeoPrivatePreventDefaultOverrideContext);
  return contextValue != null
    ? contextValue
    : !["label", "link"].includes(elementType);
}

export default useGeoPrivateInteractiveRowPreventDefault;
