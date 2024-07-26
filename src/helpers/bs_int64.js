/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import caml from "./bs_caml";
import camlFormat from "./bs_caml_format";
import {
  compare,
  max_int,
  min_int,
  neg,
  neg_one,
  one,
  sub64,
  succ,
  to_string,
  xor,
  zero,
} from "./bs_caml_int64";
import camlJsExceptions from "./bs_caml_js_exceptions";

function pred(a) {
  return sub64(a, one);
}

function abs(a) {
  return caml.i64_ge(a, zero) ? a : neg(a);
}

function lognot(a) {
  return xor(a, neg_one);
}

function ofStringOpt(a) {
  try {
    return camlFormat.caml_int64_of_string(a);
  } catch (error) {
    const ex = camlJsExceptions.internalToOCamlException(error);
    if (ex.RE_EXN_ID === "Failure") return;
    throw ex;
  }
}

const _compare = compare;

function equal(a, b) {
  return compare(a, b) === 0;
}

const _zero = zero;
const _one = one;
const _neg_one = neg_one;
const _succ = succ;
const maxInt = max_int;
const minInt = min_int;
const toString = to_string;

export {
  abs,
  _compare as compare,
  equal,
  lognot,
  maxInt,
  minInt,
  _neg_one as minusOne,
  ofStringOpt as of_string_opt,
  _one as one,
  pred,
  _succ as succ,
  toString,
  _zero as zero,
};
