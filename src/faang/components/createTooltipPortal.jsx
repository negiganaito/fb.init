/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import ReactDOM from "react-dom";

function createTooltipPortal(element, container) {
  return ReactDOM.createPortal(element, container);
}

createTooltipPortal.displayName = `${createTooltipPortal.name} [from ${module.id}]`;

export default createTooltipPortal;
