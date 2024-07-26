// __d(
//   "BizCoreTabItemClickFalcoEvent",
//   ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     a = c("getFalcoLogPolicy_DO_NOT_USE")("1743139");
//     b = d("FalcoLoggerInternal").create("biz_core_tab_item_click", a);
//     e = b;
//     g["default"] = e;
//   },
//   98
// );

// BizCoreTabItemClickFalcoEvent.ts

import { FalcoLoggerInternal } from "FalcoLoggerInternal";
import { getFalcoLogPolicy_DO_NOT_USE } from "getFalcoLogPolicy_DO_NOT_USE";

const logPolicy = getFalcoLogPolicy_DO_NOT_USE("1743139");
const BizCoreTabItemClickFalcoEvent = FalcoLoggerInternal.create(
  "biz_core_tab_item_click",
  logPolicy
);

export default BizCoreTabItemClickFalcoEvent;
