/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useLayoutEffect, useState } from "react";
import { executionEnvironment } from "@fb-util/executionEnvironment";

const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";
const listeners = new Set();

if (window.matchMedia) {
  const handleMediaChange = (event) => {
    listeners.forEach((listener) => {
      return listener(event);
    });
  };
  const matchMedia = window.matchMedia(DARK_MODE_MEDIA_QUERY);
  matchMedia.addListener(handleMediaChange);
}

const CometDarkModeSetting = {};

function getSystemPrefersDarkMode(getPreference) {
  if (!executionEnvironment.canUseDOM) {
    const preference = getPreference();
    return (
      preference === "ENABLED" ||
      (preference === "USE_SYSTEM" &&
        CometDarkModeSetting.initialGuessForDarkModeOnClient)
    );
  }
  return window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
}

function _useSystemPrefersDarkMode(getPreference) {
  let [prefersDarkMode, setPrefersDarkMode] = useState(() => {
    return getSystemPrefersDarkMode(getPreference);
  });

  useLayoutEffect(() => {
    let listener = function (event) {
      setPrefersDarkMode(event.matches);
    };
    listeners.add(listener);
    return () => {
      listeners["delete"](listener);
    };
  }, []);

  return prefersDarkMode;
}

export const useSystemPrefersDarkMode = {
  getSystemPrefersDarkMode,
  useSystemPrefersDarkMode: _useSystemPrefersDarkMode,
};
