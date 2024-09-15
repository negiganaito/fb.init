/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useMemo } from "react";

import BaseThemeDisplayModeContextProvider from "../context/BaseThemeDisplayModeContext";
import { makeNamespace } from "../helpers/stylex-compat";

import useCurrentDisplayMode from "./useCurrentDisplayMode";

const themeClasses = {
  dark: "**fb-dark-mode ",
  light: "__fb-light-mode ",
};

const useCometTheme = (requestedTheme) => {
  const currentDisplayMode = useCurrentDisplayMode();

  let effectiveTheme;
  if (requestedTheme === "invert") {
    effectiveTheme = currentDisplayMode === "light" ? "dark" : "light";
  } else {
    effectiveTheme = requestedTheme;
  }

  const ThemeProvider = useMemo(() => {
    return ({ children }) => (
      <BaseThemeDisplayModeContextProvider value={effectiveTheme}>
        {children}
      </BaseThemeDisplayModeContextProvider>
    );
  }, [effectiveTheme]);

  const themeClassNames = makeNamespace({
    theme: themeClasses[effectiveTheme],
  });

  return [ThemeProvider, themeClassNames];
};

export default useCometTheme;
