/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const messengerDomainRegex = /(^|\.)messenger\.com$/i;
const validProtocols = ["https"];

function isMessengerDotComURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") return false;
  if (!uri.getDomain() && !uri.getProtocol()) return false;
  return (
    validProtocols.indexOf(uri.getProtocol()) !== -1 &&
    messengerDomainRegex.test(uri.getDomain())
  );
}

export default isMessengerDotComURI;
