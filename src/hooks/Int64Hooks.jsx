/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useEffect, useMemo } from "react";
import I64 from "I64";

function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (
      Array.isArray(item) &&
      item.length === 2 &&
      Number.isInteger(item[0]) &&
      Number.isInteger(item[1])
    ) {
      result.push(item[0], item[1]);
    } else {
      result.push(item, undefined);
    }
  }
  return result;
}

export function useEffectInt64(effect, deps) {
  return useEffect(effect, deps === null ? null : flattenArray(deps));
}

export function useCallbackInt64(callback, deps) {
  return useCallback(callback, deps === null ? null : flattenArray(deps));
}

export function useMemoInt64(factory, deps) {
  return useMemo(factory, deps === null ? null : flattenArray(deps));
}

export function usePickInt64(obj, keys) {
  return useMemo(() => {
    const result = {};
    for (const key of keys) {
      result[key] = obj?.[key];
    }
    return result;
  }, [obj === null, ...keys.map((key) => obj?.[key])]);
}

function mostlyShallowEqual(a, b) {
  if (a === b) return a !== 0 || b !== 0 || 1 / a === 1 / b;
  else {
    const aInt64 = I64.cast(a);
    if (aInt64 !== null) {
      const bInt64 = I64.cast(b);
      if (bInt64 !== null) return I64.equal(aInt64, bInt64);
    }
    // eslint-disable-next-line no-self-compare
    return a !== a && b !== b;
  }
}

export function deepEqual(a, b) {
  if (mostlyShallowEqual(a, b)) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  )
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !mostlyShallowEqual(a[key], b[key])
    )
      return false;
  }

  return true;
}
