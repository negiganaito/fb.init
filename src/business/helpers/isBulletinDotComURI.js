/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const bulletinDomainRegex = /(^|\.)bulletin\.com$/i;
const validProtocols = ["https"];

function isBulletinDotComURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") return false;
  if (!uri.getDomain() && !uri.getProtocol()) return false;
  return (
    validProtocols.indexOf(uri.getProtocol()) !== -1 &&
    bulletinDomainRegex.test(uri.getDomain())
  );
}

export default isBulletinDotComURI;
