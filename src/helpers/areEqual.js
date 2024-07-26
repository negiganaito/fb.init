/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable max-params */
/* eslint-disable complexity */

const poolA = [];
const poolB = [];

function areEqual(obj1, obj2) {
  const stackA = poolA.length ? poolA.pop() : [];
  const stackB = poolB.length ? poolB.pop() : [];
  const result = compare(obj1, obj2, stackA, stackB);
  stackA.length = 0;
  stackB.length = 0;
  poolA.push(stackA);
  poolB.push(stackB);
  return result;
}

function compare(a, b, stackA, stackB) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  const toString = Object.prototype.toString;
  const typeA = toString.call(a);
  if (typeA !== toString.call(b)) return false;

  switch (typeA) {
    case "[object String]":
      return a === String(b);
    case "[object Number]":
      return isNaN(a) || isNaN(b) ? false : a === Number(b);
    case "[object Date]":
    case "[object Boolean]":
      return Number(a) === Number(b);
    case "[object RegExp]":
      return (
        a.source === b.source &&
        a.global === b.global &&
        a.multiline === b.multiline &&
        a.ignoreCase === b.ignoreCase
      );
  }

  let length = stackA.length;
  while (length--) {
    if (stackA[length] === a) return stackB[length] === b;
  }

  stackA.push(a);
  stackB.push(b);

  try {
    if (typeA === "[object Array]") {
      length = a.length;
      if (length !== b.length) return false;
      while (length--) {
        if (!compare(a[length], b[length], stackA, stackB)) return false;
      }
    } else if (a instanceof Set) {
      if (a.size !== b.size) return false;
      const valuesB = Array.from(b.values());
      for (const valueA of a) {
        let found = false;
        for (let i = 0; i < valuesB.length; i++) {
          if (compare(valueA, valuesB[i], stackA, stackB)) {
            found = true;
            valuesB.splice(i, 1);
            break;
          }
        }
        if (!found) return false;
      }
    } else if (a instanceof Map) {
      if (a.size !== b.size) return false;
      const entriesB = Array.from(b);
      for (const [keyA, valueA] of a) {
        let found = false;
        for (let i = 0; i < entriesB.length; i++) {
          const [keyB, valueB] = entriesB[i];
          if (
            compare(keyA, keyB, stackA, stackB) &&
            compare(valueA, valueB, stackA, stackB)
          ) {
            found = true;
            entriesB.splice(i, 1);
            break;
          }
        }
        if (!found) return false;
      }
    } else {
      if (a.constructor !== b.constructor) return false;
      if (
        Object.prototype.hasOwnProperty.call(a, "valueOf") &&
        Object.prototype.hasOwnProperty.call(b, "valueOf")
      ) {
        return a.valueOf() === b.valueOf();
      }

      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;

      for (const key of keysA) {
        if (key === "_owner") continue; // Special case for React
        if (
          !Object.prototype.hasOwnProperty.call(b, key) ||
          !compare(a[key], b[key], stackA, stackB)
        )
          return false;
      }
    }
  } finally {
    stackA.pop();
    stackB.pop();
  }
  return true;
}

export default areEqual;
