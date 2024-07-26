/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ClickIDDomainBlacklistSVConfig } from "./ClickIDDomainBlacklistSVConfig";

const protocols = ["http", "https"];

function isClickIDBlacklistSVDomainURI(uri) {
  if (!protocols.includes(uri.getProtocol())) {
    return false;
  }

  return ClickIDDomainBlacklistSVConfig.domains.some((domain) => {
    if (uri.isSubdomainOfDomain(domain)) {
      return true;
    }
    if (!domain.includes(".")) {
      const domainParts = uri.getDomain().split(".");
      return domainParts.includes(domain);
    }
    return false;
  });
}

export default isClickIDBlacklistSVDomainURI;
