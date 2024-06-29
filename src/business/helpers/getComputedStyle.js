/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import getDefaultViewForNode from "./getDefaultViewForNode";

const getComputedStyle = (node, pseudoElement) => {
  const defaultView = getDefaultViewForNode(node);
  return defaultView ? defaultView.getComputedStyle(node, pseudoElement) : null;
};

export default getComputedStyle;
