/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

/**
 * @typedef RelayProfilerContextProps
 * @property {*} wrapPrepareQueryResource
 */

/**
 * @type {import("react").Context<RelayProfilerContextProps>}
 */
export const RelayProfilerContext = createContext({
  wrapPrepareQueryResource: (a) => {
    return a();
  },
});
