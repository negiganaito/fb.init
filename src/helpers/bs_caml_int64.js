/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { i64_eq, i64_ge } from "./bs_caml";

const minInt = [-2147483648, 0];
const maxInt = [2147483647, 4294967295];
const one = [0, 1];
const zero = [0, 0];
const negOne = [-1, 4294967295];

function mk(a, b) {
  return [b, a >>> 0];
}

function isNegative(a) {
  return (a & -2147483648) !== 0;
}

function isNonNegative(a) {
  return (a & -2147483648) === 0;
}

function succ(a) {
  const b = (a[1] + 1) >>> 0;
  const carry = b === 0 ? 1 : 0;
  return [(a[0] + carry) | 0, b];
}

function neg(a) {
  const b = ((a[1] ^ -1) + 1) >>> 0;
  const carry = b === 0 ? 1 : 0;
  return [((a[0] ^ -1) + carry) | 0, b];
}

function add(a, b, c) {
  const e = a[1];
  const f = (e + b) | 0;
  const carry =
    (isNegative(e) && (isNegative(b) || isNonNegative(f))) ||
    (isNegative(b) && isNonNegative(f))
      ? 1
      : 0;
  return [(a[0] + c + carry) | 0, f >>> 0];
}

function add64(a, b) {
  return add(a, b[1], b[0]);
}

function equalNull(a, c) {
  return c !== null && i64_eq(a, c);
}

function equalUndefined(a, c) {
  return c !== undefined && i64_eq(a, c);
}

function equalNullable(a, c) {
  return c !== null && i64_eq(a, c);
}

function sub(a, b, c) {
  const e = ((b ^ -1) + 1) >>> 0;
  const f = ((c ^ -1) + (e === 0 ? 1 : 0)) | 0;
  return add(a, e, f);
}

function sub64(a, b) {
  return sub(a, b[1], b[0]);
}

function lsl_(a, b) {
  if (b === 0) return a;
  const c = a[1];
  return b >= 32
    ? [c << (b - 32), 0]
    : [(c >>> (32 - b)) | (a[0] << b), (c << b) >>> 0];
}

function lsr_(a, b) {
  if (b === 0) return a;
  const c = a[0];
  const shift = b - 32;
  return shift === 0
    ? [0, c >>> 0]
    : shift > 0
    ? [0, c >>> shift]
    : [c >>> b, ((c << -shift) | (a[1] >>> b)) >>> 0];
}

function asr_(a, b) {
  if (b === 0) return a;
  const c = a[0];
  return b < 32
    ? [c >> b, ((c << (32 - b)) | (a[1] >>> b)) >>> 0]
    : [c >= 0 ? 0 : -1, (c >> (b - 32)) >>> 0];
}

function isZero(a) {
  return a[0] === 0 && a[1] === 0;
}

function mul(a, b) {
  // eslint-disable-next-line no-unreachable-loop
  while (true) {
    const d = a[0];
    const e = b[0];
    if (d !== 0 && e !== 0) break;

    const f = a[1] * b[1];
    const g = (f >>> 16) + a[1] * b[0];
    const h = (g >>> 16) + a[0] * b[1];
    const i = (h >>> 16) + a[0] * b[0];

    return [
      i,
      (f & 0xffff) | ((g & 0xffff) << 16) | (((h & 0xffff) << 16) >>> 0),
    ];
  }
  return zero;
}

function xor(a, b) {
  return [a[0] ^ b[0], (a[1] ^ b[1]) >>> 0];
}

function or_(a, b) {
  return [a[0] | b[0], (a[1] | b[1]) >>> 0];
}

function and_(a, b) {
  return [a[0] & b[0], (a[1] & b[1]) >>> 0];
}

function toFloat(a) {
  return a[0] * 4294967296 + a[1];
}

function ofFloat(a) {
  if (isNaN(a) || !isFinite(a)) return zero;
  if (a <= -9223372036854776e3) return minInt;
  if (a + 1 >= 9223372036854776e3) return maxInt;
  if (a < 0) return neg(ofFloat(-a));
  const b = Math.floor(a / 4294967296);
  const c = a % 4294967296;
  return [b, c >>> 0];
}

function discardSign(a) {
  return [a[0] & 2147483647, a[1]];
}

function toInt32(a) {
  return a[1] | 0;
}

function toHex(a) {
  const b = a[1].toString(16);
  const c = a[0].toString(16);
  return a[0] === 0 && a[1] === 0
    ? "0"
    : a[1] === 0
    ? c + "00000000"
    : c + b.padStart(8, "0");
}

function toString(a) {
  if (isZero(a)) return "0";
  if (a[0] < 0)
    return a[0] === minInt[0] && a[1] === minInt[1]
      ? "-9223372036854775808"
      : "-" + toString(neg(a));
  const b = Math.floor(toFloat(a) / 10);
  const c = ofFloat(b);
  const d = sub64(a, [b * 10, 0]);
  return toString(c) + d[1].toString();
}

function div(a, b) {
  // eslint-disable-next-line no-throw-literal
  if (isZero(b)) throw { RE_EXN_ID: "Division_by_zero", Error: new Error() };
  if (a[0] !== -2147483648) {
    if (a[0] !== 0 || a[1] !== 0) {
      if (b[0] !== -2147483648 || b[1] !== 0) {
        if (a[0] < 0) return neg(div(neg(a), b));
        if (b[0] < 0) return neg(div(a, neg(b)));
        let result = zero;
        let remainder = a;
        while (i64_ge(remainder, b)) {
          const shift = Math.floor(toFloat(remainder) / toFloat(b));
          const step = ofFloat(shift);
          const prod = mul(step, b);
          result = add64(result, step);
          remainder = sub64(remainder, prod);
        }
        return result;
      }
    }
  }
  return zero;
}

function mod_(a, b) {
  return sub64(a, mul(div(a, b), b));
}

function compare(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}

function ofInt32(a) {
  return [a < 0 ? -1 : 0, a >>> 0];
}

function floatOfBits(a) {
  const buffer = new ArrayBuffer(8);
  new Uint32Array(buffer).set([a[1], a[0]]);
  return new Float64Array(buffer)[0];
}

function bitsOfFloat(a) {
  const buffer = new Float64Array([a]).buffer;
  const ints = new Int32Array(buffer);
  return [ints[1], ints[0] >>> 0];
}

export {
  add as add64,
  and_,
  asr_,
  bitsOfFloat,
  compare,
  discardSign,
  div,
  equalNull,
  equalNullable,
  equalUndefined,
  floatOfBits,
  isZero,
  lsl_,
  lsr_,
  maxInt as max_int,
  minInt as min_int,
  mk,
  mod_,
  mul,
  neg,
  negOne as neg_one,
  ofFloat as of_float,
  ofInt32 as of_int32,
  one,
  or_,
  sub as sub64,
  succ,
  toString as to_string,
  toFloat,
  toHex,
  toInt32,
  xor,
  zero,
};
