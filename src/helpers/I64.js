/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { nullthrows } from "fbjs/lib/nullthrows";

// import {  caml_int64, int64 } from "./bs_caml";
import { i64_gt, i64_max, i64_min } from "./bs_caml";
import { caml_int64_of_string } from "./bs_caml_format";
import {
  add64,
  and_,
  asr_,
  compare,
  div,
  is_zero,
  lsl_,
  lsr_,
  max_int,
  min_int,
  mk,
  mod_,
  mul,
  neg,
  neg_one,
  of_float,
  of_int32,
  or_,
  sub64,
  succ,
  to_float,
  to_string,
  toInt32,
  xor,
} from "./bs_caml_int64";
import { abs, equal, lognot, minusOne, of_string_opt } from "./bs_int64";

const wrapI64Function =
  (fn) =>
  (...args) => {
    const result = fn(...args);
    if (!result._tag) {
      result._tag = "i64";
    }
    return result;
  };

const wrapNullableI64Function =
  (fn) =>
  (...args) => {
    const result = fn(...args);
    if (result !== null && !result._tag) {
      result._tag = "i64";
    }
    return result;
  };

const _mk = wrapI64Function(mk);
const _succ = wrapI64Function(succ);
const minInt = wrapI64Function(() => min_int)();
const maxInt = wrapI64Function(() => max_int)();
const one = wrapI64Function(() => one)();
const zero = wrapI64Function(() => zero)();
const negOne = wrapI64Function(() => neg_one)();
const ofInt32 = wrapI64Function(of_int32);
const to_int32 = wrapI64Function(toInt32);
const _add = wrapI64Function(add64);
const _neg = wrapI64Function(neg);
const _equal = wrapI64Function(equal);
const sub = wrapI64Function(sub64);
const _lsl_ = wrapI64Function(lsl_);
const _lsr_ = wrapI64Function(lsr_);
const _asr_ = wrapI64Function(asr_);
const _mul = wrapI64Function(mul);
const _xor = wrapI64Function(xor);
const _or_ = wrapI64Function(or_);
const _and_ = wrapI64Function(and_);
const ofFloat = wrapI64Function(of_float);
const _div = wrapI64Function(div);
const _mod_ = wrapI64Function(mod_);
const _compare = wrapI64Function(compare);

const _minusOne = wrapI64Function(() => minusOne)();
const _abs = wrapI64Function(abs);
const _lognot = wrapI64Function(lognot);
const ofStringOpt = wrapNullableI64Function(of_string_opt);

let toString;
let ofString;
if (typeof BigInt === "function") {
  // eslint-disable-next-line no-undef
  const I = BigInt(32);
  // eslint-disable-next-line no-undef
  const J = BigInt(4294967295);
  toString = (a) =>
    // eslint-disable-next-line no-undef
    BigInt.asIntN(64, (BigInt(a[0]) << I) + BigInt(a[1])).toString();
  ofString = wrapI64Function((str) => {
    // eslint-disable-next-line no-undef
    const num = BigInt.asIntN(64, BigInt(str));
    const result = [Number(num >> I), Number(num & J)];
    result._tag = "i64";
    return result;
  });
} else {
  toString = to_string;
  ofString = wrapI64Function(caml_int64_of_string);
}

const max = wrapI64Function(i64_max);
const min = wrapI64Function(i64_min);

function cast(a) {
  if (Array.isArray(a) && a.length === 2) {
    const [b, c] = a;
    if (Number.isInteger(b) && Number.isInteger(c)) {
      const result = [b, c];
      result._tag = "i64";
      return result;
    }
  }
  return undefined;
}

function castExn(a) {
  return nullthrows(cast(a));
}

function isI64(a) {
  return a !== null && a._tag === "i64";
}

export {
  _abs as abs,
  _add as add,
  _and_ as and_,
  _asr_ as asr_,
  cast,
  castExn,
  _compare as compare,
  _div as div,
  _equal as equal,
  i64_gt as gt,
  is_zero,
  isI64,
  _lognot as lognot,
  _lsl_ as lsl_,
  _lsr_ as lsr_,
  max,
  maxInt,
  min,
  minInt,
  _minusOne as minusOne,
  _mk as mk,
  _mod_ as mod_,
  _mul as mul,
  _neg as neg,
  negOne,
  ofFloat as of_float,
  ofString as of_string,
  ofInt32,
  ofStringOpt,
  one,
  _or_ as or_,
  sub,
  _succ as succ,
  to_float,
  to_int32,
  toString as to_string,
  _xor as xor,
  zero,
};
