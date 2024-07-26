/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function differenceSets(set, ...setsWithValuesToRemove) {
  const ret = new Set();
  // eslint-disable-next-line no-labels
  FIRST: for (const value of set) {
    for (const otherSet of setsWithValuesToRemove) {
      if (otherSet.has(value)) {
        // eslint-disable-next-line no-labels
        continue FIRST;
      }
    }
    ret.add(value);
  }
  return ret;
}

export default differenceSets;
