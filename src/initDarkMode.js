/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometDarkMode } from "@fb-theme/utils/comet-dark-mode";
import { CometStyleXSheet } from "@fb-theme/utils/comet-stylex-sheet";

CometDarkMode.initDarkMode();
CometStyleXSheet.rootStyleSheet.injectTheme();
