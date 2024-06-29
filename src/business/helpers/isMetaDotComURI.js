/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const metaRegex = /(^|\.)meta\.com$/i;
const allowedProtocols = ["https"];

function isMetaDotComURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  const domain = uri.getDomain();
  const protocol = uri.getProtocol();

  if (!domain && !protocol) {
    return true;
  }

  return allowedProtocols.includes(protocol) && metaRegex.test(domain);
}

export default isMetaDotComURI;
