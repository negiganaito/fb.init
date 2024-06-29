/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function Mash() {
  let n = 0xefc8249d;

  const mash = function (data) {
    data = data.toString();
    for (let i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = "Mash 0.9";
  return mash;
}

function Alea() {
  let s0 = 0;
  let s1 = 0;
  let s2 = 0;
  let c = 1;

  const args = Array.prototype.slice.call(arguments);
  if (args.length === 0) {
    args.push(new Date());
  }

  let mash = Mash();

  s0 = mash(" ");
  s1 = mash(" ");
  s2 = mash(" ");

  for (let i = 0; i < args.length; i++) {
    s0 -= mash(args[i]);
    if (s0 < 0) {
      s0 += 1;
    }
    s1 -= mash(args[i]);
    if (s1 < 0) {
      s1 += 1;
    }
    s2 -= mash(args[i]);
    if (s2 < 0) {
      s2 += 1;
    }
  }

  mash = null;

  const random = function () {
    const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    s2 = t - (c = t | 0);
    return s2;
  };

  random.version = "Alea 0.9";
  random.args = args;
  return random;
}

export default Alea;
