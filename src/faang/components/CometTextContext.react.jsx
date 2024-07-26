/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo } from "react";

import CometTextTypography from "./CometTextTypography.react";

const CometTextContext = createContext(null);

export function useCometTextContext() {
  return useContext(CometTextContext);
}

const buttonStyles = {
  disabled: "disabledButton",
  highlight: "primaryDeemphasizedButton",
  secondary: "secondaryButton",
  white: "primaryButton",
};

function getButtonStyle(color, type) {
  if (type) {
    const style = buttonStyles[color];
    return style !== null ? style : color;
  }
  return color;
}

export function CometTextContextProvider({ children, color, type }) {
  if (type === null) {
    return (
      <CometTextContext.Provider value={null}>
        {typeof children === "function" ? children(null) : children}
      </CometTextContext.Provider>
    );
  } else {
    return (
      <CometTextContextProviderNonNull color={color} type={type}>
        {children}
      </CometTextContextProviderNonNull>
    );
  }
}

CometTextContextProvider.displayName = `${CometTextContextProvider.name} [from ${CometTextContextProvider.id}]`;

export function CometTextContextProviderNonNull({ children, color, type }) {
  const defaultColor = CometTextTypography[type].defaultColor || "primary";
  const resolvedColor = getButtonStyle(
    color !== null ? color : defaultColor,
    type === "button1" || type === "button2"
  );
  const value = useMemo(
    () => ({ color: resolvedColor, type }),
    [resolvedColor, type]
  );

  return (
    <CometTextContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </CometTextContext.Provider>
  );
}

CometTextContextProviderNonNull.displayName = `${CometTextContextProviderNonNull.name} [from ${CometTextContextProviderNonNull.id}]`;
