/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const headerProviders = [];

function getHeaders() {
  return headerProviders.reduce((headers, provider) => {
    const providerHeaders = provider();
    return Object.assign(headers, providerHeaders);
  }, {});
}

function registerHeaderProvider(provider) {
  headerProviders.push(provider);
}

export { getHeaders, registerHeaderProvider };
