/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function tooltipPropsFor(content, position, alignH) {
  if (!content) return {};

  const props = {
    "data-tooltip-content": content,
    "data-hover": "tooltip",
  };

  if (position) {
    props["data-tooltip-position"] = position;
  }

  if (alignH) {
    props["data-tooltip-alignh"] = alignH;
  }

  return props;
}

export default tooltipPropsFor;
