/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const oculusRegex = /(^|\.)oculus\.com$/i;
const allowedProtocols = ["https"];

function isOculusDotComURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  const domain = uri.getDomain();
  const protocol = uri.getProtocol();

  if (!domain && !protocol) {
    return false;
  }

  return allowedProtocols.includes(protocol) && oculusRegex.test(domain);
}

export default isOculusDotComURI;
