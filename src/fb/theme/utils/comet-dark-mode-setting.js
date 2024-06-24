/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { DARK_MODE_KEY } from "@fb-theme/constant/comet-dark-mode-local-storage-key";

export const CometDarkModeSetting = {
  initialGuessForDarkModeOnClient: true,
  initialClientStateGuess: true,
  // TODO
  initialSetting:
    localStorage.getItem(DARK_MODE_KEY) === "ENABLED" ? "ENABLED" : "DISABLED",
};
