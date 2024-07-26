/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const structuredClone =
  (typeof window !== "undefined" && window.structuredClone) || null;

export default structuredClone;
