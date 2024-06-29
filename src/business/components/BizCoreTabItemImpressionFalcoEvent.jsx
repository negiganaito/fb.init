// __d(
//   "BizCoreTabItemImpressionFalcoEvent",
//   ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     a = c("getFalcoLogPolicy_DO_NOT_USE")("1743142");
//     b = d("FalcoLoggerInternal").create("biz_core_tab_item_impression", a);
//     e = b;
//     g["default"] = e;
//   },
//   98
// );

import { FalcoLoggerInternal } from "FalcoLoggerInternal";
import { getFalcoLogPolicy_DO_NOT_USE } from "getFalcoLogPolicy_DO_NOT_USE";

const logPolicy = getFalcoLogPolicy_DO_NOT_USE("1743142");
const BizCoreTabItemImpressionFalcoEvent = FalcoLoggerInternal.create(
  "biz_core_tab_item_impression",
  logPolicy
);

export default BizCoreTabItemImpressionFalcoEvent;
