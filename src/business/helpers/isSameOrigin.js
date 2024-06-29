/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const isSameOrigin = (a, b) => {
  if (
    !a.getProtocol() ||
    !a.getDomain() ||
    !b.getProtocol() ||
    !b.getDomain()
  ) {
    return false;
  }
  return a.getOrigin() === b.getOrigin();
};

export default isSameOrigin;
