/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import UserAgent from "fbjs/lib/UserAgent";

const CSSUserAgentSupports = {
  webkitLineClamp() {
    return !(
      UserAgent.isBrowser("IE") ||
      UserAgent.isBrowser("Edge < 17") ||
      UserAgent.isBrowser("Firefox < 68")
    );
  },
};

export default CSSUserAgentSupports;
