/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
let characters = "abcdefghijklmnopqrstuvwxyz012345";

// Simple hash function for strings
export function getSimpleHash(...args) {
  // Initialize the hash variable.
  let hash = 0;

  // If the argument is not null, process it.
  if (args) {
    // Iterate over each character in the argument string.
    for (let j = 0; j < args.length; j++) {
      // Update the hash value using bitwise operations.
      hash = (hash << 5) - hash + args.charCodeAt(j);
    }
  }

  // Initialize an empty string for the final hash result.
  let result = "";

  // Convert the hash value to a string using the characters defined above.
  for (let k = 0; k < 6; k++) {
    result = characters.charAt(hash & 31) + result;
    hash >>= 5;
  }

  // Return the final hash string.
  return result;
}
