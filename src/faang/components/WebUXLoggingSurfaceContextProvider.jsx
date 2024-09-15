/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext } from "react";

const WebUXSurfaceLoggingContext = createContext("unknown");

function WebUXLoggingSurfaceContextProvider({ children, value }) {
  return (
    <WebUXSurfaceLoggingContext.Provider value={value}>
      {children}
    </WebUXSurfaceLoggingContext.Provider>
  );
}

WebUXLoggingSurfaceContextProvider.displayName = `${WebUXLoggingSurfaceContextProvider.name} [from WebUXLoggingSurfaceContextProvider]`;

export { WebUXLoggingSurfaceContextProvider, WebUXSurfaceLoggingContext };
