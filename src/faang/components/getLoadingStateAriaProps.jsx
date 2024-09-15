/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import fbt from "fbt";

function getLoadingStateAriaProps(progress, options) {
  let ariaProps;

  if (progress === null) {
    ariaProps = {
      "aria-label": fbt._("__JHASH__6lD-XyRyuHe__JHASH__"),
      role: "status",
    };
  } else {
    ariaProps = {
      "aria-valuemax": options?.max ?? 100,
      "aria-valuemin": options?.min ?? 0,
      "aria-valuenow": progress,
      role: "progressbar",
    };
  }

  return { ...ariaProps };
}

export default getLoadingStateAriaProps;
