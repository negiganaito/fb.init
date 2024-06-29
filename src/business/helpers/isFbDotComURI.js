/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const fbDotComRegex = /(^|\.)fb\.com?$/i;
const protocols = ["http", "https"];

function isFbDotComURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  const domain = uri.getDomain();
  const protocol = uri.getProtocol();

  if (!domain && !protocol) {
    return false;
  }

  return protocols.includes(protocol) && fbDotComRegex.test(domain);
}

export default isFbDotComURI;
