/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const internalFbRegex = /(^|\.)internalfb\.com$/i;

function isInternalFBURI(uri) {
  return internalFbRegex.test(uri.getDomain());
}

export default isInternalFBURI;
