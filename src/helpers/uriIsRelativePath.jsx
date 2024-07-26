/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function uriIsRelativePath(uri) {
  return (
    !uri.getProtocol() &&
    !uri.getDomain() &&
    !uri.getPort() &&
    uri.toString() !== ""
  );
}

export default uriIsRelativePath;
