// __d(
//   "useDefineBizKitNavigationCustomizationContext",
//   ["emptyFunction", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = (h || d("react")).useState;
//     function a() {
//       var a = i(!1),
//         b = a[0];
//       a = a[1];
//       var d = i(!1),
//         e = d[0];
//       d = d[1];
//       var f = i(!1),
//         g = f[0];
//       f = f[1];
//       var h = i(c("emptyFunction")),
//         j = h[0];
//       h = h[1];
//       return {
//         hasShownMoreToolsCustomizationTip: b,
//         setHasShownMoreToolsCustomizationTip: a,
//         shouldShowCustomizeYourMenuAnytimeTip: e,
//         setShouldShowCustomizeYourMenuAnytimeTip: d,
//         showLeftNavEditModal: j,
//         setShowLeftNavEditModal: h,
//         shouldOverlayMBSNavBar: g,
//         setShouldOverlayMBSNavBar: f,
//       };
//     }
//     g["default"] = a;
//   },
//   98
// );

import emptyFunction from "emptyFunction";
import { useState } from "react";

interface NavigationCustomizationContext {
  hasShownMoreToolsCustomizationTip: boolean;
  setHasShownMoreToolsCustomizationTip: (value: boolean) => void;
  shouldShowCustomizeYourMenuAnytimeTip: boolean;
  setShouldShowCustomizeYourMenuAnytimeTip: (value: boolean) => void;
  showLeftNavEditModal: () => void;
  setShowLeftNavEditModal: (func: () => void) => void;
  shouldOverlayMBSNavBar: boolean;
  setShouldOverlayMBSNavBar: (value: boolean) => void;
}

function useDefineBizKitNavigationCustomizationContext(): NavigationCustomizationContext {
  const [
    hasShownMoreToolsCustomizationTip,
    setHasShownMoreToolsCustomizationTip,
  ] = useState(false);
  const [
    shouldShowCustomizeYourMenuAnytimeTip,
    setShouldShowCustomizeYourMenuAnytimeTip,
  ] = useState(false);
  const [shouldOverlayMBSNavBar, setShouldOverlayMBSNavBar] = useState(false);
  const [showLeftNavEditModal, setShowLeftNavEditModal] = useState(
    () => emptyFunction
  );

  return {
    hasShownMoreToolsCustomizationTip,
    setHasShownMoreToolsCustomizationTip,
    shouldShowCustomizeYourMenuAnytimeTip,
    setShouldShowCustomizeYourMenuAnytimeTip,
    showLeftNavEditModal,
    setShowLeftNavEditModal,
    shouldOverlayMBSNavBar,
    setShouldOverlayMBSNavBar,
  };
}

export default useDefineBizKitNavigationCustomizationContext;
