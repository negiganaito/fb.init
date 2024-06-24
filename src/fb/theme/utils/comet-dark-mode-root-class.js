/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

// import StylexSheet from "./stylex-sheet";

// function i(a, b, c) {
//   c ? a.classList.add(b) : a.classList.remove(b);
// }
// function toggleDarkModeRootClass(a) {
//   updateDarkModeRootClass(a ? "ENABLED" : "DISABLED");
// }
// function updateDarkModeRootClass(a) {
//   if (!ExecutionEnvironment.canUseDOM) {
//     return;
//   }
//   let b = window.document.documentElement;
//   i(b, StylexSheet.DARK_MODE_CLASS_NAME, a === "ENABLED");

//   i(
//     b,
//     StylexSheet.LIGHT_MODE_CLASS_NAME,
//     a === "DISABLED" || a === "UNDECLARED"
//   );
// }

// export const CometDarkModeRootClass = {
//   updateDarkModeRootClass,
//   toggleDarkModeRootClass,
// };

import { executionEnvironment } from "@fb-util/executionEnvironment";

import { StyleXSheet } from "./stylex-sheet.stylex";

/**
 * Adds or removes a class from the HTML element based on the condition.
 *
 * @param {HTMLElement} element - The HTML element.
 * @param {string} className - The class name to add or remove.
 * @param {boolean} condition - Whether to add or remove the class.
 */
function toggleClass(element, className, condition) {
  condition
    ? element.classList.add(className)
    : element.classList.remove(className);
}

/**
 * Toggles the dark mode class on the root HTML element.
 *
 * @param {boolean} isEnabled - Whether dark mode is enabled.
 */
function toggleDarkModeRootClass(isEnabled) {
  updateDarkModeRootClass(isEnabled ? "ENABLED" : "DISABLED");
}

/**
 * Updates the dark mode root class based on the mode status.
 *
 * @param {string} status - The dark mode status.
 */
function updateDarkModeRootClass(status) {
  if (!executionEnvironment.canUseDOM) {
    return;
  }

  const rootElement = window.document.documentElement;

  toggleClass(
    rootElement,
    StyleXSheet.DARK_MODE_CLASS_NAME,
    status === "ENABLED"
  );

  toggleClass(
    rootElement,
    StyleXSheet.LIGHT_MODE_CLASS_NAME,
    status === "DISABLED" || status === "UNDECLARED"
  );
}

export const CometDarkModeRootClass = {
  updateDarkModeRootClass,
  toggleDarkModeRootClass,
};
