/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import InteractionCloning from "InteractionCloning";
import InteractionTracingCore from "InteractionTracingCore";
import InteractionTracingLogger from "InteractionTracingLogger";
import NavigationTracingCore from "NavigationTracingCore";
import NetworkStatusTracker from "NetworkStatusTracker";

const interactionTracing = {
  InteractionTracingCore,
  InteractionCloning,
  NavigationTracing: NavigationTracingCore,
  NetworkStatusTracker,
  getTraceStatus: InteractionTracingLogger.getTraceStatus,
};

export default interactionTracing;
