/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function isEnterpriseURI(uri) {
  if (uri.isEmpty() && uri.toString() !== "#") {
    return false;
  }

  if (!uri.getDomain() && !uri.getProtocol()) {
    return false;
  }

  if (uri.getProtocol() !== "https") {
    return false;
  }

  const domain = uri.getDomain();
  return (
    domain.includes("facebookenterprise.com") ||
    domain.includes("metaenterprise.com")
  );
}

export default isEnterpriseURI;
