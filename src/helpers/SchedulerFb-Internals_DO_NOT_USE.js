/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ifRequireable from "./ifRequireable";
import {
  unstable_cancelCallback,
  unstable_continueExecution,
  unstable_forceFrameRate,
  unstable_getCurrentPriorityLevel,
  unstable_IdlePriority,
  unstable_ImmediatePriority,
  unstable_LowPriority,
  unstable_NormalPriority,
  unstable_now,
  unstable_pauseExecution,
  unstable_Profiling,
  unstable_requestPaint,
  unstable_runWithPriority,
  unstable_scheduleCallback,
  unstable_shouldYield,
  unstable_UserBlockingPriority,
  unstable_wrapCallback,
} from "./Scheduler-profiling.classic";

const SchedulerFbInternals = {
  unstable_ImmediatePriority: unstable_ImmediatePriority,
  unstable_UserBlockingPriority: unstable_UserBlockingPriority,
  unstable_NormalPriority: unstable_NormalPriority,
  unstable_LowPriority: unstable_LowPriority,
  unstable_IdlePriority: unstable_IdlePriority,
  unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
  unstable_runWithPriority: unstable_runWithPriority,
  unstable_now: unstable_now,
  unstable_scheduleCallback: (priority, callback, options) => {
    const wrappedCallback = ifRequireable(
      "TimeSlice",
      (TimeSlice) => {
        return TimeSlice.guard(callback, "unstable_scheduleCallback", {
          propagationType: TimeSlice.PropagationType.CONTINUATION,
          registerCallStack: true,
        });
      },
      () => callback
    );
    return unstable_scheduleCallback(priority, wrappedCallback, options);
  },
  unstable_cancelCallback: (callback) => {
    return unstable_cancelCallback(callback);
  },
  unstable_wrapCallback: (callback) => {
    const wrappedCallback = ifRequireable(
      "TimeSlice",
      (TimeSlice) => {
        return TimeSlice.guard(callback, "unstable_wrapCallback", {
          propagationType: TimeSlice.PropagationType.CONTINUATION,
          registerCallStack: true,
        });
      },
      () => callback
    );
    return unstable_wrapCallback(wrappedCallback);
  },
  unstable_pauseExecution: unstable_pauseExecution,
  unstable_continueExecution: unstable_continueExecution,
  unstable_shouldYield: unstable_shouldYield,
  unstable_requestPaint: unstable_requestPaint,
  unstable_forceFrameRate: unstable_forceFrameRate,
  unstable_Profiling: unstable_Profiling,
};

export default SchedulerFbInternals;
