// __d(
//   "SchedulerFeatureFlags",
//   ["gkx", "qex"],
//   function (a, b, c, d, e, f, g) {
//     var h, i;
//     a = !0;
//     b = c("gkx")("21074");
//     d = !1;
//     e = d;
//     f = 10;
//     var j = 10,
//       k = 10;
//     h = (h = c("qex")._("526")) != null ? h : 250;
//     i = (i = c("qex")._("538")) != null ? i : 5e3;
//     c = (c = c("qex")._("543")) != null ? c : 1e4;
//     g.enableSchedulerDebugging = a;
//     g.enableProfiling = b;
//     g.enableIsInputPending = d;
//     g.enableIsInputPendingContinuous = e;
//     g.frameYieldMs = f;
//     g.continuousYieldMs = j;
//     g.maxYieldMs = k;
//     g.userBlockingPriorityTimeout = h;
//     g.normalPriorityTimeout = i;
//     g.lowPriorityTimeout = c;
//   },
//   98
// );

import { gkx, qex } from "gkx"; // Assuming 'gkx' and 'qex' are imported from their respective modules

const enableSchedulerDebugging = true;
const enableProfiling = gkx("21074");
const enableIsInputPending = false;
const enableIsInputPendingContinuous = enableIsInputPending;
const frameYieldMs = 10;
const continuousYieldMs = 10;
const maxYieldMs = 10;

const userBlockingPriorityTimeout = qex("526") ?? 250;
const normalPriorityTimeout = qex("538") ?? 5000;
const lowPriorityTimeout = qex("543") ?? 10000;

export {
  enableSchedulerDebugging,
  enableProfiling,
  enableIsInputPending,
  enableIsInputPendingContinuous,
  frameYieldMs,
  continuousYieldMs,
  maxYieldMs,
  userBlockingPriorityTimeout,
  normalPriorityTimeout,
  lowPriorityTimeout,
};
