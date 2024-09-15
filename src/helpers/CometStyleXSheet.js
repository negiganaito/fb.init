/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometStyleXDarkTheme } from "./CometStyleXDarkTheme";
import { CometStyleXDefaultTheme } from "./CometStyleXDefaultTheme";
import StyleXSheet, {
  DARK_MODE_CLASS_NAME,
  LIGHT_MODE_CLASS_NAME,
} from "./StyleXSheet";

class CometStyleXSheet extends StyleXSheet {
  constructor() {
    super({
      rootDarkTheme: CometStyleXDarkTheme,
      rootTheme: CometStyleXDefaultTheme,
    });
  }
}

const rootStyleSheet = new CometStyleXSheet();

export {
  CometStyleXSheet,
  DARK_MODE_CLASS_NAME,
  LIGHT_MODE_CLASS_NAME,
  rootStyleSheet,
};
