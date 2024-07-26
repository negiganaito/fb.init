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
import SchedulerFbInternals from "./SchedulerFb-Internals_DO_NOT_USE";

const priorities = {
  unstable_Immediate: SchedulerFbInternals.unstable_ImmediatePriority,
  unstable_UserBlocking: SchedulerFbInternals.unstable_UserBlockingPriority,
  unstable_Normal: SchedulerFbInternals.unstable_NormalPriority,
  unstable_Low: SchedulerFbInternals.unstable_LowPriority,
  unstable_Idle: SchedulerFbInternals.unstable_IdlePriority,
};

let isInCallbackExecution = false;

const JSScheduler = {
  priorities,
  shouldYield: SchedulerFbInternals.unstable_shouldYield,
  getCurrentPriorityLevel:
    SchedulerFbInternals.unstable_getCurrentPriorityLevel,
  runWithPriority: SchedulerFbInternals.unstable_runWithPriority,
  runWithPriority_DO_NOT_USE: SchedulerFbInternals.unstable_runWithPriority,
  defer(callback) {
    const priority = this.getCurrentPriorityLevel();
    return SchedulerFbInternals.unstable_scheduleCallback(priority, callback);
  },
  getCallbackScheduler() {
    const priority = this.getCurrentPriorityLevel();
    return (callback) =>
      SchedulerFbInternals.unstable_scheduleCallback(priority, callback);
  },
  getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE() {
    const priority = this.getCurrentPriorityLevel();
    return (callback) => {
      return SchedulerFbInternals.unstable_scheduleCallback(
        priorities.unstable_UserBlocking,
        () => {
          SchedulerFbInternals.unstable_runWithPriority(priority, callback);
        }
      );
    };
  },
  deferUserBlockingRunAtCurrentPri_DO_NOT_USE(callback) {
    const priority = this.getCurrentPriorityLevel();
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_UserBlocking,
      () => {
        SchedulerFbInternals.unstable_runWithPriority(priority, callback);
      }
    );
  },
  scheduleImmediatePriCallback(callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_Immediate,
      callback
    );
  },
  scheduleUserBlockingPriCallback(callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_UserBlocking,
      callback
    );
  },
  scheduleNormalPriCallback(callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_Normal,
      callback
    );
  },
  scheduleLoggingPriCallback(callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_Low,
      callback
    );
  },
  scheduleSpeculativeCallback(callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(
      priorities.unstable_Idle,
      callback
    );
  },
  cancelCallback(callback) {
    SchedulerFbInternals.unstable_cancelCallback(callback);
  },
  scheduleDelayedCallback_DO_NOT_USE(priority, delay, callback) {
    return SchedulerFbInternals.unstable_scheduleCallback(priority, callback, {
      delay,
    });
  },
  cancelDelayedCallback_DO_NOT_USE(callback) {
    SchedulerFbInternals.unstable_cancelCallback(callback);
  },
  startEventProfiling() {
    const { startLoggingProfilingEvents } =
      SchedulerFbInternals.unstable_Profiling ?? {};
    if (typeof startLoggingProfilingEvents === "function") {
      startLoggingProfilingEvents();
    }
  },
  stopEventProfiling() {
    const { stopLoggingProfilingEvents } =
      SchedulerFbInternals.unstable_Profiling ?? {};
    if (typeof stopLoggingProfilingEvents === "function") {
      stopLoggingProfilingEvents();
    }
  },
  makeSchedulerGlobalEntry(frameRate, enableProfiling = false) {
    if (frameRate !== null) {
      SchedulerFbInternals.unstable_forceFrameRate(frameRate);
    }
    if (enableProfiling) {
      this.startEventProfiling();
    }
    // eslint-disable-next-line no-undef
    globalThis.ScheduleJSWork = (...args) => {
      if (isInCallbackExecution) {
        SchedulerFbInternals.unstable_runWithPriority(
          priorities.unstable_Immediate,
          () => args[0](...args.slice(1))
        );
      } else {
        this.deferUserBlockingRunAtCurrentPri_DO_NOT_USE(() => {
          isInCallbackExecution = true;
          try {
            args[0](...args.slice(1));
          } finally {
            isInCallbackExecution = false;
          }
        });
      }
    };
  },
};

export default JSScheduler;
