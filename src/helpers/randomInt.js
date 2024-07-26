/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

const randomInt = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  invariant(
    min <= max,
    `Expected min (${min}) to be less than or equal to max (${max})`
  );
  return Math.floor(min + Math.random() * (max - min));
};

export default randomInt;
