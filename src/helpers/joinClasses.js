/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const joinClasses = (...args) => {
  return args.filter(Boolean).join(" ");
};

export default joinClasses;
