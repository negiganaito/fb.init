/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const whatsappRegex = /(^|\.)whatsapp\.com$/i;

function isWhatsAppURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  const domain = uri.getDomain();
  const protocol = uri.getProtocol();

  if (!domain && !protocol) {
    return false;
  }

  return protocol === "https" && whatsappRegex.test(domain);
}

export default isWhatsAppURI;
