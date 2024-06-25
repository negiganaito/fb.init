/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { createContext } from "react";

export const StaticContext = createContext(null);

const StaticContextProvider = ({ children, staticContext }) => {
  return (
    <StaticContext.Provider value={staticContext}>
      {children}
    </StaticContext.Provider>
  );
};

export default StaticContextProvider;
