/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const setDisplayName = (promise, displayName) => {
  promise.displayName = displayName;
  return promise;
};

const getDisplayName = (promise) => {
  const { displayName } = promise;
  return typeof displayName === "string" ? displayName : null;
};

export { getDisplayName, setDisplayName };
