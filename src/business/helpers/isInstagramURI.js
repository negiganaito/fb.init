/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let instagramRegex = null;

function isInstagramURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  if (!uri.getDomain() && !uri.getProtocol()) {
    return false;
  }

  if (uri.getProtocol() !== "https") {
    return false;
  }

  if (!instagramRegex) {
    instagramRegex = /(^|\.)instagram\.com$/i;
  }

  return instagramRegex.test(uri.getDomain());
}

export default isInstagramURI;
