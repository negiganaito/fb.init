/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometDarkMode } from "@fb-theme/utils/comet-dark-mode";

import { makeCometDarkModeStateProvider } from "./make-comet-dark-mode-state-provider";

export const CometDarkModeStateProvider = makeCometDarkModeStateProvider({
  getDarkModeSetting: CometDarkMode.getDarkModeSetting,
  saveDarkModeSetting: CometDarkMode.saveDarkModeSetting,
});
