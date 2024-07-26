/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import ConstUri from "./ConstUriUtils";
import isFacebookURI from "./isFacebookURI";

function decorateHrefWithTrackingInfo(href, cftParams, tnParams) {
  if (href !== null && href !== "#" && (cftParams.length || tnParams.length)) {
    let uri = ConstUri.getUri(href);
    if (uri !== null) {
      if (!isFacebookURI(uri)) return href;
      if (cftParams.length) uri = uri.addQueryParam("__cft__", cftParams);
      if (tnParams.length && uri !== null)
        uri = uri.addQueryParam("__tn__", tnParams.join(""));
      return uri !== null ? uri.toString() : href;
    }
  }
  return href;
}

export { decorateHrefWithTrackingInfo };
