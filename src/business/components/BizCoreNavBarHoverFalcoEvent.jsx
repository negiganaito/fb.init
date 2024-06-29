// __d(
//   "BizCoreNavBarHoverFalcoEvent",
//   ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     a = c("getFalcoLogPolicy_DO_NOT_USE")("1743119");
//     b = d("FalcoLoggerInternal").create("biz_core_nav_bar_hover", a);
//     e = b;
//     g["default"] = e;
//   },
//   98
// );

import { FalcoLoggerInternal } from "FalcoLoggerInternal";
import { getFalcoLogPolicy_DO_NOT_USE } from "getFalcoLogPolicy_DO_NOT_USE";

const logPolicy = getFalcoLogPolicy_DO_NOT_USE("1743119");
const BizCoreNavBarHoverFalcoEvent = FalcoLoggerInternal.create(
  "biz_core_nav_bar_hover",
  logPolicy
);

export default BizCoreNavBarHoverFalcoEvent;
