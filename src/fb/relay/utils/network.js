/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { Network, QueryResponseCache } from "relay-runtime";

import { registerLoader } from "./module-loader";

const ONE_MINUTE_IN_MS = 60 * 1000;

export const createNetwork = () => {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  const fetchResponse = async (operation, variables, cacheConfig) => {
    const { id, cacheID, text } = operation;

    const isQuery = operation.operationKind === "query";
    const forceFetch = cacheConfig && cacheConfig.force;
    const moduleId = cacheID ?? id;

    if (isQuery && !forceFetch && moduleId) {
      const fromCache = responseCache.get(moduleId, variables);
      if (fromCache) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(moduleId, variables, text);
  };

  const fetchFn = async (...args) => {
    const response = await fetchResponse(...args);

    if (Array.isArray(response)) {
      const responses = response;
      responses.forEach((singleResponse) => {
        if (Array.isArray(singleResponse.extensions?.modules)) {
          registerModuleLoaders(singleResponse.extensions?.modules);
        }
      });
    } else {
      const singleResponse = response;
      if (Array.isArray(singleResponse.extensions?.modules)) {
        registerModuleLoaders(singleResponse.extensions?.modules);
      }
    }

    return response;
  };

  const network = Network.create(fetchFn);
  network.responseCache = responseCache;

  return network;
};

export async function networkFetch(id, variables, text) {
  const response = await fetch(process.env.JS_RESOURCE_SERVER, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      variables,
      query: text,
    }),
  });

  return response.json();
}

function registerModuleLoaders(modules) {
  modules.forEach((module) => {
    if (module.endsWith("$normalization.graphql")) {
      registerLoader(module, () => import(`../../__generated__/${module}`));
    } else {
      registerLoader(module, () => import(`../../@components/${module}`));
    }
  });
}
