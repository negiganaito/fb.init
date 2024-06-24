/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

/**
 * @typedef {Object} BaseThemeConfigContextProps
 * @property {string} darkClassName - The class name for the dark theme.
 * @property {*} darkVariables - Variables for the dark theme. (Note: The type is set to 'any'.)
 * @property {string} lightClassName - The class name for the light theme.
 * @property {*} lightVariables - Variables for the light theme. (Note: The type is set to 'any'.)
 */

/**
 * @type {import("react").Context<BaseThemeConfigContextProps>}
 */
export const BaseThemeConfigContext = createContext({
  darkClassName: null,
  darkVariables: {},
  lightClassName: null,
  lightVariables: {},
});
