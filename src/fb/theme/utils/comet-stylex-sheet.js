/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometStyleXDarkTheme } from "../constant/comet-stylex-dark-theme";
import { CometStyleXDefaultTheme } from "../constant/comet-stylex-default-theme";

import { StyleXSheet } from "./stylex-sheet.stylex";

class _CometStyleXSheet extends StyleXSheet {
  constructor() {
    super({
      rootDarkTheme: CometStyleXDarkTheme,
      rootTheme: CometStyleXDefaultTheme,
    });
  }
}

export const CometStyleXSheet = {
  rootStyleSheet: new _CometStyleXSheet(),
  CometStyleXSheet: _CometStyleXSheet,
  DARK_MODE_CLASS_NAME: StyleXSheet.DARK_MODE_CLASS_NAME,
  LIGHT_MODE_CLASS_NAME: StyleXSheet.DARK_MODE_CLASS_NAME,
};
