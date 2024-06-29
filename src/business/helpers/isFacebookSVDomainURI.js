/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { FBDomainsSVConfig } from "./FBDomainsSVConfig";

const protocols = ["http", "https"];

function isFacebookSVDomainURI(uri) {
  if (!protocols.includes(uri.getProtocol())) {
    return false;
  }

  const domain = FBDomainsSVConfig.domains.get(uri.getDomain());
  return domain !== null;
}

export default isFacebookSVDomainURI;
