/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const defaultPolicy = { r: 1 };
const policies = {};

function getFalcoLogPolicy(token) {
  const policy = policies[token];
  if (policy === null) {
    console.log(
      `Failed to find a Haste-supplied log policy for the Falco event identified by token \`${token}\`. Failing open (ie. with a sampling rate of 1.0).`,
      "staticresources"
    );
    return defaultPolicy;
  }
  return policy;
}

getFalcoLogPolicy.add = function (newPolicies, stats) {
  Object.keys(newPolicies).forEach((token) => {
    if (stats) stats.entry++;
    if (policies[token] === null) {
      policies[token] = newPolicies[token];
    } else if (stats) {
      stats.dup_entry++;
    }
  });
};

export default getFalcoLogPolicy;
