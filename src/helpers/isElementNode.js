/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import isNode from "fbjs/lib/isNode";

const isElementNode = (node) => isNode(node) && node.nodeType === 1;

export default isElementNode;
