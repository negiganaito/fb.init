/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { BUIElementStateType } from "./BUIPrivateFocusLevelType";
import BUIPrivateSelectorFactory from "./BUIPrivateSelectorFactory";

const stateAlphas = {
  hover: 0.05,
  focus: 0.05,
  pressed: 0.2,
};

const defaultAlphas = {
  default: 0,
  active: 0.1,
  disabled: 0,
};

const getAlphaTransformer = (rgbArray, baseAlpha) => {
  return BUIPrivateSelectorFactory((state, focusLevel) => {
    const [r, g, b] = rgbArray;
    const stateAlpha = state !== null ? defaultAlphas[state] : 0;
    const focusAlpha =
      state !== BUIElementStateType.disabled && focusLevel !== null
        ? stateAlphas[focusLevel]
        : 0;
    const alpha = baseAlpha + stateAlpha + focusAlpha;
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  });
};

export { getAlphaTransformer };
