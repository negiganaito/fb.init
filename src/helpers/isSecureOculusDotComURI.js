/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const secureOculusRegex = /(^|\.)secure\.oculus\.com$/i;
const workMetaRegex = /(^|\.)work\.meta\.com$/i;
const allowedProtocols = ["https"];

function isSecureOculusDotComURI(uri) {
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
    (secureOculusRegex.test(domain) || workMetaRegex.test(domain))
  );
}

export default isSecureOculusDotComURI;
