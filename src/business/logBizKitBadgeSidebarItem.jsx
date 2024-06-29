__d(
  "logBizKitBadgeSidebarItem",
  ["getBizAppTabName", "requireDeferred"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = c("requireDeferred")("BizCoreTabItemUpdateFalcoEvent").__setRef(
      "logBizKitBadgeSidebarItem"
    );
    function a(a, b, c, e, f, g) {
      if (a == null) return;
      h.onReady(function (h) {
        h.log(function () {
          return babelHelpers["extends"](
            {
              event_data: {
                target_tab: d("getBizAppTabName").getBizAppTabName(a),
                badge_count: b.toString(),
                badge_type: c,
                location: e,
                position: f.toString(),
              },
              client_timestamp_ms: Date.now(),
            },
            g
          );
        });
      });
    }
    g.logBizKitBadgeSidebarItem = a;
  },
  98
);
// logBizKitBadgeSidebarItem.ts

import { getBizAppTabName } from "getBizAppTabName";
import { requireDeferred } from "requireDeferred";

const BizCoreTabItemUpdateFalcoEvent = requireDeferred(
  "BizCoreTabItemUpdateFalcoEvent"
).__setRef("logBizKitBadgeSidebarItem");

export function logBizKitBadgeSidebarItem(
  targetTab: string | null,
  badgeCount: number,
  badgeType: string,
  location: string,
  position: number,
  additionalData?: Record<string, any>
): void {
  if (targetTab == null) return;

  BizCoreTabItemUpdateFalcoEvent.onReady((eventLogger: any) => {
    eventLogger.log(() => ({
      event_data: {
        target_tab: getBizAppTabName(targetTab),
        badge_count: badgeCount.toString(),
        badge_type: badgeType,
        location: location,
        position: position.toString(),
      },
      client_timestamp_ms: Date.now(),
      ...additionalData,
    }));
  });
}
