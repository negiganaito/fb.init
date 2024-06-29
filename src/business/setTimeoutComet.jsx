// __d("setTimeoutComet", ["JSScheduler", "setTimeoutCometInternals"], (function(a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     function a(a, b) {
//         var c = (h || (h = d("JSScheduler"))).getCurrentPriorityLevel() === (h || (h = d("JSScheduler"))).priorities.unstable_Idle ? (h || (h = d("JSScheduler"))).priorities.unstable_Idle : (h || (h = d("JSScheduler"))).priorities.unstable_Low;
//         for (var e = arguments.length, f = new Array(e > 2 ? e - 2 : 0), g = 2; g < e; g++)
//             f[g - 2] = arguments[g];
//         return d("setTimeoutCometInternals").setTimeoutAtPriority_DO_NOT_USE.apply(d("setTimeoutCometInternals"), [c, a, b].concat(f))
//     }
//     g["default"] = a
// }
// ), 98);

import { getCurrentPriorityLevel, priorities } from "JSScheduler";
import { setTimeoutAtPriority_DO_NOT_USE } from "setTimeoutCometInternals";

function setTimeoutComet(callback, delay, ...args) {
  const currentPriorityLevel = getCurrentPriorityLevel();
  const priority =
    currentPriorityLevel === priorities.unstable_Idle
      ? priorities.unstable_Idle
      : priorities.unstable_Low;

  return setTimeoutAtPriority_DO_NOT_USE(priority, callback, delay, ...args);
}

export default setTimeoutComet;
