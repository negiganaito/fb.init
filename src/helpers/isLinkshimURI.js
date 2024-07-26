/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import isBulletinDotComURI from "./isBulletinDotComURI";
import isFacebookURI from "./isFacebookURI";
import isMessengerDotComURI from "./isMessengerDotComURI";
import { LinkshimHandlerConfig } from "./LinkshimHandlerConfig";

const linkshimHostParts = LinkshimHandlerConfig.linkshim_host.split(".");
const linkshimHostDomain = linkshimHostParts[linkshimHostParts.length - 1];

function isLinkshimURI(uri) {
  const path = uri.getPath();
  if (
    (path === "/l.php" ||
      path.indexOf("/si/ajax/l/") === 0 ||
      path.indexOf("/l/") === 0 ||
      path.indexOf("l/") === 0) &&
    (isFacebookURI(uri) ||
      isMessengerDotComURI(uri) ||
      isBulletinDotComURI(uri))
  ) {
    return true;
  }

  if (
    path === LinkshimHandlerConfig.linkshim_path &&
    uri.isSubdomainOfDomain(linkshimHostDomain)
  ) {
    const queryData = uri.getQueryData();
    if (
      queryData[LinkshimHandlerConfig.linkshim_enc_param] !== null &&
      queryData[LinkshimHandlerConfig.linkshim_url_param] !== null
    ) {
      return true;
    }
  }

  return false;
}

export default isLinkshimURI;
