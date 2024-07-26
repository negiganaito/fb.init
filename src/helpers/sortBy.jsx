/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const sortBy = (array, iteratee) => {
  let mappedArray = array.map((value, index) => ({
    index,
    sortValue: iteratee(value),
    value,
  }));

  mappedArray.sort((a, b) => {
    const { sortValue: aValue, index: aIndex } = a;
    const { sortValue: bValue, index: bIndex } = b;

    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return aIndex - bIndex;
  });

  return mappedArray.map((item) => item.value);
};

export default sortBy;
