/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function isBarcelonaURI(uri) {
  const protocol = uri.getProtocol();
  const domain = uri.getDomain();
  return (
    (protocol === "http" || protocol === "https") &&
    (domain === "threads.net" || domain.endsWith(".threads.net"))
  );
}

export default isBarcelonaURI;
