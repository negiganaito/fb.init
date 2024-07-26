/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function isCdnURI(uri) {
  const protocol = uri.getProtocol();
  if (protocol !== "http" && protocol !== "https") {
    return false;
  }

  const port = Number(uri.getPort());
  if (port && port !== 80 && port !== 443) {
    return false;
  }

  return uri.isSubdomainOfDomain("fbcdn.net");
}

export default isCdnURI;
