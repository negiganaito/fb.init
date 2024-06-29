// __d(
//   "BizKitAccountSwitcherLoggingUtils",
//   [
//     "BizCoreAccountSwitcherClickFalcoEvent",
//     "BizCoreAccountSwitcherImpressionFalcoEvent",
//     "BizKitConfigDynamicFields",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a(a, b) {
//       c("BizCoreAccountSwitcherClickFalcoEvent").log(function () {
//         return babelHelpers["extends"](
//           {
//             client_timestamp_ms: Date.now(),
//             event_data: { target_type: a },
//             event_location: "unknown",
//           },
//           b,
//           { logged_in_user_type: h() }
//         );
//       });
//     }
//     function b(a, b, d, e) {
//       var f = {};
//       d != null &&
//         e != null &&
//         (f = {
//           active_session_count: String(d),
//           saved_session_count: String(e),
//         });
//       c("BizCoreAccountSwitcherImpressionFalcoEvent").log(function () {
//         return babelHelpers["extends"](
//           {
//             client_timestamp_ms: Date.now(),
//             event_data: babelHelpers["extends"]({ target_type: a }, f),
//             event_location: "unknown",
//           },
//           b,
//           { logged_in_user_type: h() }
//         );
//       });
//     }
//     function h() {
//       if (d("BizKitConfigDynamicFields").is_ig_login) return "instagram";
//       else if (d("BizKitConfigDynamicFields").is_mma_login) return "mma";
//       return "facebook";
//     }
//     g.logAccountSwitcherClick = a;
//     g.logAccountSwitcherImpression = b;
//     g.convertUserTypeForLogging = h;
//   },
//   98
// );

import { log as logClickEvent } from "BizCoreAccountSwitcherClickFalcoEvent";
import { log as logImpressionEvent } from "BizCoreAccountSwitcherImpressionFalcoEvent";
import { is_ig_login, is_mma_login } from "BizKitConfigDynamicFields";

interface EventData {
  [key: string]: any;
}

function logAccountSwitcherClick(
  targetType: string,
  eventData: EventData
): void {
  logClickEvent(() => ({
    client_timestamp_ms: Date.now(),
    event_data: { target_type: targetType },
    event_location: "unknown",
    ...eventData,
    logged_in_user_type: convertUserTypeForLogging(),
  }));
}

function logAccountSwitcherImpression(
  targetType: string,
  eventData: EventData,
  activeSessionCount: number | null,
  savedSessionCount: number | null
): void {
  const sessionData =
    activeSessionCount != null && savedSessionCount != null
      ? {
          active_session_count: String(activeSessionCount),
          saved_session_count: String(savedSessionCount),
        }
      : {};

  logImpressionEvent(() => ({
    client_timestamp_ms: Date.now(),
    event_data: { target_type: targetType, ...sessionData },
    event_location: "unknown",
    ...eventData,
    logged_in_user_type: convertUserTypeForLogging(),
  }));
}

function convertUserTypeForLogging(): string {
  if (is_ig_login) return "instagram";
  if (is_mma_login) return "mma";
  return "facebook";
}

export {
  logAccountSwitcherClick,
  logAccountSwitcherImpression,
  convertUserTypeForLogging,
};
