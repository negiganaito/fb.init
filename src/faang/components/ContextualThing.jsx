/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import containsNode from "fbjs/lib/containsNode";
import CSS from "fbjs/lib/CSSCore";

import ge from "../../business/helpers/ge";
import getOrCreateDOMID from "../../business/helpers/getOrCreateDOMID";

function register(element, owner) {
  element.setAttribute("data-ownerid", getOrCreateDOMID(owner));
}

function containsIncludingLayers(element, target) {
  let currentTarget = target;
  while (currentTarget) {
    if (containsNode(element, currentTarget)) return true;
    currentTarget = getContext(currentTarget);
  }
  return false;
}

function getContext(element) {
  let currentElement = element;
  while (currentElement) {
    const ownerId = currentElement.getAttribute("data-ownerid");
    if (ownerId) return ge(ownerId);
    currentElement = currentElement.parentNode;
  }
  return null;
}

function parentByClass(element, className) {
  let currentElement = element;
  while (currentElement && !CSS.hasClass(currentElement, className)) {
    const ownerId = currentElement.getAttribute("data-ownerid");
    currentElement = ownerId ? ge(ownerId) : currentElement.parentNode;
  }
  return currentElement;
}

export { containsIncludingLayers, getContext, parentByClass, register };
