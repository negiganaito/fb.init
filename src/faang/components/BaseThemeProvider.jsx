/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useMemo } from "react";

import BaseThemeConfigContext from "../../context/BaseThemeConfigContext";
import BaseThemeDisplayModeContext from "../../context/BaseThemeDisplayModeContext";
import useCurrentDisplayMode from "../../hooks/useCurrentDisplayMode";

const BaseThemeProvider = ({ children, config, displayMode }) => {
  const themeConfigContext = useContext(BaseThemeConfigContext);
  const currentDisplayMode = useCurrentDisplayMode();
  const mode = displayMode ?? currentDisplayMode;

  const themeClassName = useMemo(() => {
    let className;
    if (config?.type === "CLASSNAMES") {
      className = mode === "dark" ? config.dark : config.light;
    } else {
      className =
        mode === "dark"
          ? themeConfigContext.darkClassName
          : themeConfigContext.lightClassName;
    }
    return className ? { $$css: true, theme: className } : null;
  }, [
    config,
    themeConfigContext.darkClassName,
    themeConfigContext.lightClassName,
    mode,
  ]);

  const themeConfig = useMemo(() => {
    if (config) {
      if (config.type === "VARIABLES") {
        return {
          ...themeConfigContext,
          darkVariables: {
            ...themeConfigContext.darkVariables,
            ...config.dark,
          },
          lightVariables: {
            ...themeConfigContext.lightVariables,
            ...config.light,
          },
        };
      } else if (config.type === "CLASSNAMES") {
        return {
          ...themeConfigContext,
          darkClassName: config.dark,
          lightClassName: config.light,
        };
      }
    }
    return themeConfigContext;
  }, [config, themeConfigContext]);

  const themeVariables = convertToCSSVariables(
    mode === "dark" ? themeConfig.darkVariables : themeConfig.lightVariables
  );

  return (
    <BaseThemeConfigContext.Provider value={themeConfig}>
      <BaseThemeDisplayModeContext.Provider value={mode}>
        {children(themeClassName, themeVariables)}
      </BaseThemeDisplayModeContext.Provider>
    </BaseThemeConfigContext.Provider>
  );
};

BaseThemeProvider.displayName = `${BaseThemeProvider.name} [from ${BaseThemeProvider.id}]`;

function convertToCSSVariables(variables) {
  const cssVariables = {};
  Object.keys(variables).forEach((key) => {
    cssVariables[`--${key}`] = variables[key];
  });
  return cssVariables;
}

export default BaseThemeProvider;
