/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { registerHeaderProvider } from "./cometAsyncRequestHeaders";
import QuickPerformanceLogger from "./QuickPerformanceLogger";

function QPLAddCometRequestHeaders() {
  registerHeaderProvider(() => {
    const activeFlowIds = QuickPerformanceLogger.getActiveMarkerIds({
      type: 2,
    });
    if (activeFlowIds.length > 0) {
      const headers = {};
      headers["X-FB-QPL-Active-Flows"] = activeFlowIds.sort().join(",");
      return headers;
    }
    return {};
  });
}

export default QPLAddCometRequestHeaders;
