// __d(
//   "BizKitLeftNavBadgeIcon.react",
//   ["BizKitSidebarItemFeatureContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       a = a["data-testid"];
//       c("BizKitSidebarItemFeatureContext").useFeatureContext({ hasBadge: !0 });
//       return i.jsx("div", {
//         className:
//           "x19hi10v x14yjl9h xudhj91 x18nykt9 xww2gxu x1lliihq xols6we x1v4s8kt",
//         "data-testid": void 0,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

// BizKitLeftNavBadgeIcon.react.tsx

import { useFeatureContext } from "BizKitSidebarItemFeatureContext";
import React from "react";

type BizKitLeftNavBadgeIconProps = {
  "data-testid"?: string;
};

const BizKitLeftNavBadgeIcon: React.FC<BizKitLeftNavBadgeIconProps> = (
  props
) => {
  const { "data-testid": dataTestId } = props;
  useFeatureContext({ hasBadge: true });

  return (
    <div
      className="x19hi10v x14yjl9h xudhj91 x18nykt9 xww2gxu x1lliihq xols6we x1v4s8kt"
      data-testid={dataTestId}
    />
  );
};

BizKitLeftNavBadgeIcon.displayName = `${BizKitLeftNavBadgeIcon.name} [from ${module.id}]`;

export default BizKitLeftNavBadgeIcon;
