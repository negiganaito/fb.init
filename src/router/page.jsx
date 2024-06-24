/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import { CometDarkModeContext } from "@fb-theme/contexts/comet-dark-mode-context";

export const HomePage = () => {
  const { currentSetting, setDarkModeSetting } =
    useContext(CometDarkModeContext);

  return (
    <button
      onClick={() => {
        setDarkModeSetting(
          currentSetting === "ENABLED" ? "DISABLED" : "ENABLED"
        );
      }}
    >
      Toggle theme
    </button>
  );
};
