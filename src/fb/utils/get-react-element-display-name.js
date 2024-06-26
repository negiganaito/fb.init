/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { getReactComponentDisplayName } from "./get-react-component-display-name";

export function getReactElementDisplayName(element) {
  if (!element) {
    return "#empty";
  }

  if (
    typeof element === "string" ||
    typeof element === "number" ||
    typeof element === "boolean"
  ) {
    return "#text";
  }
  if (!element.type) {
    return "ReactComponent";
  }

  return typeof element.type === "string"
    ? element.type
    : getReactComponentDisplayName(element.type);
}
