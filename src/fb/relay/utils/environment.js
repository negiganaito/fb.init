/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { ReactRelayContext } from "react-relay";
import { Environment, RecordSource, Store } from "relay-runtime";

import moduleLoader from "./moduleLoader";
import { createNetwork } from "./network";

const IS_SERVER = typeof window === typeof undefined;
const CLIENT_DEBUG = false;
const SERVER_DEBUG = false;

function createEnvironment() {
  // Operation loader is reponsible for loading JS modules/components
  // for data-processing and rendering
  const operationLoader = {
    get: (name) => moduleLoader(name).get(),
    load: (name) => moduleLoader(name).load(),
  };

  const network = createNetwork();
  const environment = new Environment({
    network,
    store: new Store(new RecordSource(), { operationLoader }),
    operationLoader,
    isServer: IS_SERVER,
    log(event) {
      if ((IS_SERVER && SERVER_DEBUG) || (!IS_SERVER && CLIENT_DEBUG)) {
        console.debug("[relay environment event]", event);
      }
    },
  });

  environment.getNetwork().responseCache = network.responseCache;

  return environment;
}

const environment = createEnvironment();

export const RelayEnvironment = ({ children }) => {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ReactRelayContext.Provider value={{ environment }}>
      {children}
    </ReactRelayContext.Provider>
  );
};
