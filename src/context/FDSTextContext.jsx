/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo } from "react";

import CometTextTypography from "../faang/components/CometTextTypography.react";

const FDSTextContext = createContext(null);

export const useFDSTextContext = () => useContext(FDSTextContext);

const buttonColorMap = {
  disabled: "disabledButton",
  highlight: "primaryDeemphasizedButton",
  secondary: "secondaryButton",
  white: "primaryButton",
};

const getColor = (color, isButton) => {
  return isButton ? buttonColorMap[color] ?? color : color;
};

export const FDSTextContextProvider = ({ children, color, type }) => {
  if (type === null) {
    return (
      <FDSTextContext.Provider value={null}>
        {typeof children === "function" ? children(null) : children}
      </FDSTextContext.Provider>
    );
  } else {
    return (
      <FDSTextContextProviderNonNull color={color} type={type}>
        {children}
      </FDSTextContextProviderNonNull>
    );
  }
};

FDSTextContextProvider.displayName = `FDSTextContextProvider [from ${__filename}]`;

const FDSTextContextProviderNonNull = ({ children, color, type }) => {
  const defaultColor = CometTextTypography[type].defaultColor ?? "primary";
  const finalColor = getColor(
    color ?? defaultColor,
    type === "button1" || type === "button2"
  );

  const contextValue = useMemo(
    () => ({ color: finalColor, type }),
    [finalColor, type]
  );

  return (
    <FDSTextContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </FDSTextContext.Provider>
  );
};

FDSTextContextProviderNonNull.displayName = `FDSTextContextProviderNonNull [from ${__filename}]`;

export { FDSTextContextProviderNonNull };
