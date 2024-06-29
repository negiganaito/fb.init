/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import jsRouteBuilder from "../helpers/jsRouteBuilder";

const XBizSuiteControllerRouteBuilder = jsRouteBuilder(
  "/latest/{?*rest}",
  Object.freeze({
    boosted_auto_open: false,
    auto_open_saved_replies: false,
    auto_open_order_tip: false,
    auto_open_promote: false,
    launch_notifications: false,
    launch_onboarding: false,
    partnership_messages: false,
    preloaded_with_autodraft: false,
    unified_composer_mode: "REEL",
    should_open_edit_fb_profile: false,
  }),
  undefined
);

export default XBizSuiteControllerRouteBuilder;
