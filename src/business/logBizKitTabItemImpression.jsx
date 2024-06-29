// __d(
//   "logBizKitTabItemImpression",
//   [
//     "PagesLoggerEventEnum",
//     "PagesLoggerEventTargetEnum",
//     "getBizAppTabName",
//     "requireDeferred",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = c("requireDeferred")("BizCoreTabItemImpressionFalcoEvent").__setRef(
//         "logBizKitTabItemImpression"
//       ),
//       i = c("requireDeferred")("PagesLogger").__setRef(
//         "logBizKitTabItemImpression"
//       );
//     function a(a, b, e, f, g) {
//       g === void 0 && (g = !1),
//         h.onReady(function (c) {
//           c.log(function () {
//             return babelHelpers["extends"](
//               {
//                 event_data: {
//                   position: e.toString(),
//                   badge_count: "0",
//                   badge_type: "no_badging",
//                   location: b,
//                   target_tab: d("getBizAppTabName").getBizAppTabName(a),
//                   external: g,
//                 },
//                 client_timestamp_ms: Date.now(),
//               },
//               f
//             );
//           });
//         }),
//         i.onReady(function (a) {
//           a.log(
//             (a = f.page_id) != null ? a : "",
//             c("PagesLoggerEventEnum").IMPRESSION,
//             c("PagesLoggerEventTargetEnum").MESSAGES_VIEW_INBOX,
//             null,
//             ["pages_growth"]
//           );
//         });
//     }
//     g.logBizKitTabItemImpression = a;
//   },
//   98
// );

// logBizKitTabItemImpression.ts

import { PagesLoggerEventEnum } from "PagesLoggerEventEnum";
import { PagesLoggerEventTargetEnum } from "PagesLoggerEventTargetEnum";
import { getBizAppTabName } from "getBizAppTabName";
import { requireDeferred } from "requireDeferred";

const BizCoreTabItemImpressionFalcoEvent = requireDeferred(
  "BizCoreTabItemImpressionFalcoEvent"
).__setRef("logBizKitTabItemImpression");
const PagesLogger = requireDeferred("PagesLogger").__setRef(
  "logBizKitTabItemImpression"
);

type EventData = {
  event_data: {
    position: string;
    badge_count: string;
    badge_type: string;
    location: string;
    target_tab: string;
    external: boolean;
  };
  client_timestamp_ms: number;
  page_id?: string;
};

function logBizKitTabItemImpression(
  tabName: string,
  location: string,
  position: number,
  additionalData: Partial<EventData>,
  external: boolean = false
): void {
  BizCoreTabItemImpressionFalcoEvent.onReady((eventLogger: any) => {
    eventLogger.log(() => ({
      ...{
        event_data: {
          position: position.toString(),
          badge_count: "0",
          badge_type: "no_badging",
          location,
          target_tab: getBizAppTabName(tabName),
          external,
        },
        client_timestamp_ms: Date.now(),
      },
      ...additionalData,
    }));
  });

  PagesLogger.onReady((logger: any) => {
    logger.log(
      additionalData.page_id ?? "",
      PagesLoggerEventEnum.IMPRESSION,
      PagesLoggerEventTargetEnum.MESSAGES_VIEW_INBOX,
      null,
      ["pages_growth"]
    );
  });
}

export { logBizKitTabItemImpression };
