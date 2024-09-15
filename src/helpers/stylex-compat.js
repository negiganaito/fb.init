/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const makeNamespace = (styles) => {
  styles.$$css = true;
  return styles;
};

export { makeNamespace };
