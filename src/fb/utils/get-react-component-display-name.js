/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function getReactComponentDisplayName(comp) {
  if (comp.displayName) {
    return comp.displayName;
  }

  return comp.name ?? "ReactComponent";
}
