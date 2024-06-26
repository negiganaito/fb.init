/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { PromiseAnnotate } from "@fb-util/promise-annotate";

let simpleUUIDCounter = 0;

/**
 * Generates a simple UUID.
 *
 * @returns {string} - The generated simple UUID.
 */
const getSimpleUUID = () => {
  return String(simpleUUIDCounter++);
};

/**
 * Creates a thenable description based on a set of promises.
 *
 * @param {Set<Promise>} promises - The set of promises.
 * @returns {string | null} - The thenable description or null if the set is empty.
 */
const createThenableDescription = (promises) => {
  if (promises && promises.size > 0) {
    return Array.from(promises)
      .map((promise) => {
        const displayName = PromiseAnnotate.getDisplayName(promise);
        return displayName ? displayName : "Promise";
      })
      .join(",");
  } else {
    return null;
  }
};

export const HeroPlaceholderUtils = {
  createThenableDescription,
  getSimpleUUID,
};
