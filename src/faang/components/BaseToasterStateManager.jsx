/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import JSScheduler from "../../helpers/JSScheduler";

import { CometMaxEnqueuedToastsSitevarConfig } from "./CometMaxEnqueuedToastsSitevarConfig";
import XPlatReactToasterStateManager from "./XPlatReactToasterStateManager";

const scheduleCallback = (callback) => {
  JSScheduler.scheduleNormalPriCallback(() => {
    callback();
  });
};

const BaseToasterStateManager = {
  getInstance() {
    return XPlatReactToasterStateManager.getInstance({
      callbackScheduler: scheduleCallback,
      maxQueuedToasts: CometMaxEnqueuedToastsSitevarConfig.max,
    });
  },
  resetInstance_DO_NOT_USE() {
    XPlatReactToasterStateManager.resetInstance_DO_NOT_USE();
  },
};

export default BaseToasterStateManager;
