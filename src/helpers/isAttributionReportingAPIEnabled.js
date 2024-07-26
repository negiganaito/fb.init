/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import gkx from "gkx";

import justknobx from "./justknobx";

function isAttributionReportingAPIEnabled() {
  return justknobx._("1203") && gkx("22785");
}

export default isAttributionReportingAPIEnabled;
