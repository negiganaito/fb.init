/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const relativeUrlPattern = /^(#|\/\w)/;

function isRelativeURL(url) {
  return relativeUrlPattern.test(url);
}

export default isRelativeURL;
