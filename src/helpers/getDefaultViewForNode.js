/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const getDefaultViewForNode = (node) => {
  const ownerDocument = node === document ? document : node.ownerDocument;
  return ownerDocument?.defaultView || null;
};

export default getDefaultViewForNode;
