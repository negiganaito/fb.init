/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const msngrRegex = /(^|\.)msngr\.com$/i;
const fbaudRegex = /(^|\.)fbaud\.io$/i;
const fbaudioRegex = /(^|\.)fb\.audio$/i;
const allowedProtocols = ["https"];

function isRoomsURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  const domain = uri.getDomain();
  const protocol = uri.getProtocol();

  if (!domain && !protocol) {
    return false;
  }

  return (
    allowedProtocols.includes(protocol) &&
    (msngrRegex.test(domain) ||
      fbaudRegex.test(domain) ||
      fbaudioRegex.test(domain))
  );
}

export default isRoomsURI;
