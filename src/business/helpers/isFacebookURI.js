/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let facebookRegex = null;
const allowedProtocols = ["http", "https"];

const isFacebookURI = (uri) => {
  if (!facebookRegex) {
    facebookRegex = /(^|\.)facebook\.com$/i;
  }
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }
  if (!uri.getDomain() && !uri.getProtocol()) {
    return true;
  }
  return (
    allowedProtocols.includes(uri.getProtocol()) &&
    facebookRegex.test(uri.getDomain())
  );
};

isFacebookURI.setRegex = (regex) => {
  facebookRegex = regex;
};

export default isFacebookURI;
