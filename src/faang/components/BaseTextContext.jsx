/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo } from "react";

const BaseTextContext = createContext(null);

export const BaseTextContextProvider = ({ children, nested }) => {
  const contextValue = useMemo(() => ({ nested }), [nested]);

  return (
    <BaseTextContext.Provider value={contextValue}>
      {children}
    </BaseTextContext.Provider>
  );
};

export const useBaseTextContext = () => {
  return useContext(BaseTextContext);
};
