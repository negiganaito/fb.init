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
import { i64_max, i64_min } from "./bs_caml";
import { caml_int64_of_string } from "./bs_caml_format";
import {
  add64,
  and_,
  asr_,
  compare,
  div,
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
  to_string,
  toInt32,
  xor,
} from "./bs_caml_int64";
import { abs, equal, lognot, minusOne, of_string_opt } from "./bs_int64";

const wrap =
  (fn) =>
  (...args) => {
    const result = fn(...args);
    result._tag = "i64";
    return result;
  };

const wrapNullable =
  (fn) =>
  (...args) => {
    const result = fn(...args);
    if (result !== null) {
      result._tag = "i64";
    }
    return result;
  };

const _mk = wrap(mk);
const _succ = wrap(succ);
const minInt = wrap(() => min_int)();
const maxInt = wrap(() => max_int)();
const one = wrap(() => one)();
const zero = wrap(() => zero)();
const negOne = wrap(() => neg_one)();
const ofInt32 = wrap(of_int32);
const to_int32 = wrap(toInt32);
const _add = wrap(add64);
const _neg = wrap(neg);
const _equal = wrap(equal);
const sub = wrap(sub64);
const _lsl_ = wrap(lsl_);
const _lsr_ = wrap(lsr_);
const _asr_ = wrap(asr_);
const _mul = wrap(mul);
const _xor = wrap(xor);
const _or_ = wrap(or_);
const _and_ = wrap(and_);
const ofFloat = wrap(of_float);
const _div = wrap(div);
const _mod_ = wrap(mod_);
const _compare = wrap(compare);

const _minusOne = wrap(() => minusOne)();
const _abs = wrap(abs);
const _lognot = wrap(lognot);
const ofStringOpt = wrapNullable(of_string_opt);

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
  ofString = wrap((str) => {
    // eslint-disable-next-line no-undef
    const num = BigInt.asIntN(64, BigInt(str));
    const result = [Number(num >> I), Number(num & J)];
    result._tag = "i64";
    return result;
  });
} else {
  toString = to_string;
  ofString = wrap(caml_int64_of_string);
}

const max = wrap(i64_max);
const min = wrap(i64_min);

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
  ofFloat,
  ofInt32,
  ofString,
  ofStringOpt,
  one,
  _or_ as or_,
  sub,
  _succ as succ,
  to_int32,
  toString,
  _xor as xor,
  zero,
};
