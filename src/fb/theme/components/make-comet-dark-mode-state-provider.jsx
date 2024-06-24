/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { DARK_MODE_KEY } from "@fb-theme/constant/comet-dark-mode-local-storage-key";

import { BaseThemeConfigContext } from "../contexts/base-theme-config-context";
import { BaseThemeDisplayModeContext } from "../contexts/base-theme-display-mode-context";
import { CometDarkModeContext } from "../contexts/comet-dark-mode-context";
import { DSPDisplayModeContext } from "../contexts/dsap-display-mode-context";
import { useCometSetDarkModeMetaContent } from "../hooks/use-comet-set-dark-mode-meta-content";
import { useSystemPrefersDarkMode } from "../hooks/use-system-prefers-dark-mode";
import { CometDarkModeRootClass } from "../utils/comet-dark-mode-root-class";

const defaultClass = {
  darkClassName: "__fb-dark-mode",
  darkVariables: {},
  lightClassName: "__fb-light-mode",
  lightVariables: {},
};

// TODO
// eslint-disable-next-line no-unused-vars
const _22802 = false;

const isDarkModeEnabledGlobally = false;

export const makeCometDarkModeStateProvider = ({
  getDarkModeSetting,
  saveDarkModeSetting,
}) => {
  // useSystemPrefersDarkMode();

  function DarkMode({ children }) {
    let prefersDarkMode =
      useSystemPrefersDarkMode.useSystemPrefersDarkMode(getDarkModeSetting);

    const [darkModeSetting, setDarkModeSetting] = useState(getDarkModeSetting);

    const isDarkModeEnabled =
      darkModeSetting === "ENABLED" ||
      (darkModeSetting === "USE_SYSTEM" && prefersDarkMode);

    useCometSetDarkModeMetaContent.useCometSetDarkModeMetaContent(
      isDarkModeEnabled
    );

    const themeDisplayMode = useMemo(() => {
      if (isDarkModeEnabledGlobally) {
        return "dark";
      }
      return darkModeSetting === "USE_SYSTEM"
        ? "auto"
        : darkModeSetting === "ENABLED"
        ? "dark"
        : "light";
    }, [darkModeSetting, isDarkModeEnabledGlobally]);

    let updateDarkModeSetting = useCallback((newSetting) => {
      localStorage.setItem(DARK_MODE_KEY, newSetting);
      setDarkModeSetting(newSetting);
      saveDarkModeSetting(newSetting, {
        onRevert: setDarkModeSetting,
      });
    }, []);

    useLayoutEffect(() => {
      if (isDarkModeEnabledGlobally) {
        CometDarkModeRootClass.updateDarkModeRootClass("ENABLED");
        return () => {
          CometDarkModeRootClass.updateDarkModeRootClass(darkModeSetting);
        };
      }
    }, [isDarkModeEnabledGlobally, darkModeSetting]);

    let toggleDarkMode = useCallback(() => {
      updateDarkModeSetting(isDarkModeEnabled ? "DISABLED" : "ENABLED");
    }, [isDarkModeEnabled, updateDarkModeSetting]);

    const contextValue = useMemo(() => {
      return {
        currentSetting: darkModeSetting,
        onDarkModeToggle: toggleDarkMode,
        setDarkModeSetting: updateDarkModeSetting,
      };
    }, [darkModeSetting, toggleDarkMode, updateDarkModeSetting]);

    let displayMode =
      isDarkModeEnabled || isDarkModeEnabledGlobally ? "dark" : "light";

    // eslint-disable-next-line no-unused-vars
    let handleDarkModeToggle = useCallback(() => {
      toggleDarkMode();
      // TODO
      // eslint-disable-next-line no-unused-vars
      let message = isDarkModeEnabled
        ? "Dark mode is turned off."
        : "Dark mode is turned on.";
      // cometPushToast.onReady((b) => {
      //   b = b.cometPushToast;
      //   cometPushToast({
      //     message: a,
      //   });
      // });

      // cometPushToast({
      //   message,
      // });
    }, [isDarkModeEnabled, toggleDarkMode]);

    // TODO
    // const globalKeyCommands = useMemo(() => {
    //   if (!_22802) {
    //     return [];
    //   }

    //   return [
    //     cometGetKeyCommandConfig.getCometKeyCommandConfig(
    //       "global",
    //       "toggleDarkMode",
    //       handleDarkModeToggle
    //     ),
    //   ];
    // }, [handleDarkModeToggle]);

    // useGlobalKeyCommands(globalKeyCommands);

    return (
      <BaseThemeConfigContext.Provider value={defaultClass}>
        <BaseThemeDisplayModeContext.Provider value={displayMode}>
          <CometDarkModeContext.Provider value={contextValue}>
            <DSPDisplayModeContext.Provider value={themeDisplayMode}>
              {children}
            </DSPDisplayModeContext.Provider>
          </CometDarkModeContext.Provider>
        </BaseThemeDisplayModeContext.Provider>
      </BaseThemeConfigContext.Provider>
    );
  }

  return DarkMode;
};
