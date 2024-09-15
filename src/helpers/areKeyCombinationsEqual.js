/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function areKeyCombinationsEqual(a, b) {
  if (a === null || b === null) {
    return a === b;
  }
  return (
    a.key !== "" &&
    b.key !== "" &&
    a.key === b.key &&
    a.alt === (b.alt === true) &&
    a.command === (b.command === true) &&
    a.shift === (b.shift === true)
  );
}

export default areKeyCombinationsEqual;
