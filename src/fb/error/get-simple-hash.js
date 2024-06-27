/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const g = "abcdefghijklmnopqrstuvwxyz012345";

function getSimpleHash(...args) {
  let a = 0;
  // eslint-disable-next-line no-var, no-inner-declarations
  for (var b = args.length, c = new Array(b), d = 0; d < b; d++) c[d] = args[d];
  for (let e = 0; e < c.length; e++) {
    const f = c[e];
    if (f) {
      const h = f.length;
      for (let i = 0; i < h; i++) a = (a << 5) - a + f.charCodeAt(i);
    }
  }
  let j = "";
  // eslint-disable-next-line no-sequences
  for (let k = 0; k < 6; k++) (j = g.charAt(a & 31) + j), (a >>= 5);
  return j;
}

export { getSimpleHash };
