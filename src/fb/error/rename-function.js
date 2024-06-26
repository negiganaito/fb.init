/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// Function to rename a function
export function renameFunction(func, name) {
  if (func && name) {
    try {
      Object.defineProperty(func, "name", {
        value: "<CUSTOM_NAME: " + name + ">",
      });
    } catch (e) {}
  }
  return func;
}
