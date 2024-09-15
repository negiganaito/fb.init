/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import getReactComponentDisplayName from "./getReactComponentDisplayName";

function getReactElementDisplayName(element) {
  if (element === null) return "#empty";
  if (
    typeof element === "string" ||
    typeof element === "number" ||
    typeof element === "boolean"
  )
    return "#text";

  const elementType = element.type;
  if (elementType === null) return "ReactComponent";

  return typeof elementType === "string"
    ? elementType
    : getReactComponentDisplayName(elementType);
}

export default getReactElementDisplayName;
