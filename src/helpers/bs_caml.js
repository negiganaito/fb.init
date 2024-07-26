/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function caml_int_compare(a, b) {
  return a < b ? -1 : a === b ? 0 : 1;
}

function caml_bool_compare(a, b) {
  return a ? (b ? 0 : 1) : b ? -1 : 0;
}

function caml_float_compare(a, b) {
  if (a === b) return 0;
  else if (a < b) return -1;
  // eslint-disable-next-line no-self-compare
  else if (a > b || a === a) return 1;
  // eslint-disable-next-line no-self-compare
  else if (b === b) return -1;
  else return 0;
}

function caml_string_compare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}

function caml_bool_min(a, b) {
  return a ? b : a;
}

function caml_int_min(a, b) {
  return a < b ? a : b;
}

function caml_float_min(a, b) {
  return a < b ? a : b;
}

function caml_string_min(a, b) {
  return a < b ? a : b;
}

function caml_int32_min(a, b) {
  return a < b ? a : b;
}

function caml_bool_max(a, b) {
  return a ? a : b;
}

function caml_int_max(a, b) {
  return a > b ? a : b;
}

function caml_float_max(a, b) {
  return a > b ? a : b;
}

function caml_string_max(a, b) {
  return a > b ? a : b;
}

function caml_int32_max(a, b) {
  return a > b ? a : b;
}

function i64_eq(a, b) {
  return a[1] === b[1] && a[0] === b[0];
}

function i64_neq(a, b) {
  return !i64_eq(a, b);
}

function i64_lt(a, b) {
  return !i64_ge(a, b);
}

function i64_gt(a, b) {
  if (a[0] > b[0]) return true;
  else if (a[0] < b[0]) return false;
  else return a[1] > b[1];
}

function i64_le(a, b) {
  return !i64_gt(a, b);
}

function i64_ge(a, b) {
  const [a0, a1] = a;
  const [b0, b1] = b;
  if (a0 > b0) return true;
  else if (a0 < b0) return false;
  else return a1 >= b1;
}

function i64_min(a, b) {
  return i64_ge(a, b) ? b : a;
}

function i64_max(a, b) {
  return i64_gt(a, b) ? a : b;
}

export {
  caml_bool_compare,
  caml_bool_max,
  caml_bool_min,
  caml_float_compare,
  caml_float_max,
  caml_float_min,
  caml_int_compare,
  caml_int_max,
  caml_int_min,
  caml_int32_max,
  caml_int32_min,
  caml_string_compare,
  caml_string_max,
  caml_string_min,
  i64_eq,
  i64_ge,
  i64_gt,
  i64_le,
  i64_lt,
  i64_max,
  i64_min,
  i64_neq,
};
