/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function getReactComponentDisplayName(component) {
  const displayName = component.displayName;
  if (displayName !== null) return displayName;
  return component.name !== null ? component.name : "ReactComponent";
}

export default getReactComponentDisplayName;
