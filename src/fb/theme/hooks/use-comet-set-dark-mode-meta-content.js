/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useLayoutEffect } from "react";

import { CometStyleXDarkTheme } from "../constant/comet-stylex-dark-theme";
import { CometStyleXDefaultTheme } from "../constant/comet-stylex-default-theme";
import { DspFDSWebLegacyThemeUsage } from "../constant/dsp-FDS-web-legacy-theme-usage";

const COLOR_SCHEME_META_NAME = "color-scheme";
const THEME_COLOR_META_NAME = "theme-color";
const NAV_BAR_BACKGROUND = "nav-bar-background";

/**
 * Hook to set dark mode meta content based on the provided flag.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function _useCometSetDarkModeMetaContent(isDarkMode) {
  useLayoutEffect(() => {
    setDarkModeMetaContent(isDarkMode);
  }, [isDarkMode]);
}

/**
 * Sets the dark mode meta content and updates the theme color.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function setDarkModeMetaContent(isDarkMode) {
  setDarkModeMetaColorScheme(isDarkMode);
  const theme = isDarkMode ? CometStyleXDarkTheme : CometStyleXDefaultTheme;
  Object.assign(
    theme,
    isDarkMode
      ? DspFDSWebLegacyThemeUsage.dark
      : DspFDSWebLegacyThemeUsage.light
  );
  setMetaThemeColor(theme[NAV_BAR_BACKGROUND]);
}

/**
 * Sets the meta tag for color scheme.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function setDarkModeMetaColorScheme(isDarkMode) {
  const content = isDarkMode ? "dark" : "light";
  let metaTag = document.querySelector(
    `meta[name="${COLOR_SCHEME_META_NAME}"]`
  );

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", COLOR_SCHEME_META_NAME);
    metaTag.setAttribute("content", content);
    document.querySelector("head")?.appendChild(metaTag);
  } else {
    metaTag.setAttribute("content", content);
  }
}

/**
 * Sets the meta tag for theme color.
 *
 * @param {string} color - The theme color to set.
 */
function setMetaThemeColor(color) {
  let metaTag = document.querySelector(`meta[name="${THEME_COLOR_META_NAME}"]`);

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", THEME_COLOR_META_NAME);
    metaTag.setAttribute("content", color);
    document.querySelector("head")?.appendChild(metaTag);
  } else {
    metaTag.setAttribute("content", color);
  }
}

export const useCometSetDarkModeMetaContent = {
  useCometSetDarkModeMetaContent: _useCometSetDarkModeMetaContent,
  setDarkModeMetaContent,
  setDarkModeMetaColorScheme,
  setMetaThemeColor,
};

// const j = "color-scheme";
// const k = "theme-color";
// const l = "nav-bar-background";

// function _useCometSetDarkModeMetaContent(a) {
//   useLayoutEffect(() => {
//     setDarkModeMetaContent(a);
//   }, [a]);
// }

// function setDarkModeMetaContent(a) {
//   setDarkModeMetaColorScheme(a);
//   if (a) {
//     const theme = CometStyleXDarkTheme;
//     Object.assign(CometStyleXDarkTheme, DspFDSWebLegacyThemeUsage.dark);
//     setMetaThemeColor(theme[l]);
//   } else {
//     const theme = CometStyleXDefaultTheme;
//     Object.assign(CometStyleXDefaultTheme, DspFDSWebLegacyThemeUsage.light);
//     setMetaThemeColor(theme[l]);
//   }
// }

// function setDarkModeMetaColorScheme(a) {
//   let b = document.querySelector('meta[name="' + j + '"]');
//   a = a ? "dark" : "light";
//   if (!b) {
//     let d = document.createElement("meta");
//     d.setAttribute("name", j);
//     d.setAttribute("content", a);
//     !document.querySelector("head")
//       ? undefined
//       : document.querySelector("head").appendChild(d);
//     // ((c = document.querySelector("head"))) ==
//     //   null
//     // ? void 0
//     // : c.appendChild(d);
//   } else {
//     !b ? undefined : b.setAttribute("content", a);
//   }
// }

// function setMetaThemeColor(a) {
//   let b = document.querySelector('meta[name="' + k + '"]');
//   if (!b) {
//     let d = document.createElement("meta");
//     d.setAttribute("name", k);
//     d.setAttribute("content", a);
//     !document.querySelector("head")
//       ? void 0
//       : document.querySelector("head").appendChild(d);
//   } else !b ? void 0 : b.setAttribute("content", a);
// }

// export const useCometSetDarkModeMetaContent = {
//   useCometSetDarkModeMetaContent: _useCometSetDarkModeMetaContent,
//   setDarkModeMetaContent,
//   setDarkModeMetaColorScheme,
//   setMetaThemeColor,
// };
