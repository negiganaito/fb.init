/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import isAttributionReportingAPIEnabled from "../helpers/isAttributionReportingAPIEnabled";
import XCometPrivacySandboxRegisterSourceControllerRouteBuilder from "../helpers/XCometPrivacySandboxRegisterSourceControllerRouteBuilder";

function useAttributionSourceForClick(eid, xt) {
  if (!isAttributionReportingAPIEnabled()) return null;

  const params = {};
  if (eid !== null && eid.length > 0) {
    params.eid = eid;
  } else if (xt !== null && xt.length > 0) {
    params.xt = xt;
  } else {
    return null;
  }

  const uri =
    XCometPrivacySandboxRegisterSourceControllerRouteBuilder.buildUri(params);
  return uri.toString();
}

export default useAttributionSourceForClick;
