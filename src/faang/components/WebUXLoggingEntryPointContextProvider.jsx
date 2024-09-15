/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const WebUXEntryPointLoggingContext = React.createContext("unknown");

function WebUXLoggingEntryPointContextProvider({ children, value }) {
  return (
    <WebUXEntryPointLoggingContext.Provider value={value}>
      {children}
    </WebUXEntryPointLoggingContext.Provider>
  );
}

WebUXLoggingEntryPointContextProvider.displayName = `${WebUXLoggingEntryPointContextProvider.name}`;

export { WebUXEntryPointLoggingContext, WebUXLoggingEntryPointContextProvider };
