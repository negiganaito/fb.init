/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import memoizeWithArgsWeak from "../helpers/memoizeWithArgsWeak";

const BUIPrivateSelectorFactory = (fn) => {
  return memoizeWithArgsWeak(fn);
};

export default BUIPrivateSelectorFactory;
