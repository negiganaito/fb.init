// __d(
//   "useGeoIconStyle",
//   ["useGeoTheme"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = { inherit: { color: "x1heor9g", $$css: !0 } };
//     function a(a) {
//       var b = a.color;
//       a = a.isDisabled;
//       var d = c("useGeoTheme")();
//       d = d.selectIconColor;
//       return b === "inherit" ? h.inherit : d({ color: b, isDisabled: a });
//     }
//     g["default"] = a;
//   },
//   98
// );

import { useGeoTheme } from "useGeoTheme";

interface UseGeoIconStyleProps {
  color: string;
  isDisabled: boolean;
}

const inheritStyle = { inherit: { color: "x1heor9g", $$css: true } };

function useGeoIconStyle({ color, isDisabled }: UseGeoIconStyleProps): any {
  const { selectIconColor } = useGeoTheme();
  return color === "inherit"
    ? inheritStyle.inherit
    : selectIconColor({ color, isDisabled });
}

export default useGeoIconStyle;
