/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { MatchContainer } from "react-relay/lib/relay-hooks/MatchContainer.js";

import moduleLoader from "./utils/module-loader";

export const RelayMatchContainer = ({ match, props, fallback }) => {
  return (
    <MatchContainer
      fallback={fallback}
      match={match}
      props={props}
      loader={(name) => {
        const loader = moduleLoader(name);
        const error = loader.getError();
        if (error) {
          throw new ModuleLoaderError(name, error);
        }
        const jsModule = loader.get();
        if (jsModule) {
          // we know we are loading a React component so we can safely cast
          return jsModule;
        }
        throw loader.load();
      }}
    />
  );
};

class ModuleLoaderError extends Error {
  constructor(moduleLoaderName, error) {
    super("ModuleLoaderError: " + error.message);
    this.moduleLoaderName = moduleLoaderName;
    this.error = error;
  }
}
