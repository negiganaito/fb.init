/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { rootStyleSheet } from "./CometStyleXSheet";
import gkx from "./gkx";
import stylexInject from "./stylex-inject";
import * as stylexRuntime from "./stylex-runtime";

if (!gkx("21107") && !ExecutionEnvironment.isInWorker) {
  rootStyleSheet.injectTheme();
}

const mergeStyles = (styles) => {
  styles = styles.reverse();
  const result = {};

  while (styles.length) {
    const item = styles.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        styles.push(item[i]);
      }
      continue;
    }

    if (item !== null && typeof item === "object") {
      // eslint-disable-next-line guard-for-in
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
          result[key] = value;
        } else if (typeof value === "object") {
          result[key] = result[key] ?? {};
          Object.assign(result[key], value);
        }
      }
    }
  }

  return result;
};

const compose = (...args) => mergeStyles(args);

const stylex = (...args) => stylexRuntime.legacyMerge(args);

stylex.compose = compose;
stylex.create = stylexRuntime.legacyMerge.create;
stylex.include = stylexRuntime.legacyMerge.include;
stylex.firstThatWorks = stylexRuntime.legacyMerge.firstThatWorks;
stylex.inject = stylexInject;
stylex.keyframes = stylexRuntime.legacyMerge.keyframes;
stylex.props = stylexRuntime.legacyMerge.props;
stylex.defineVars = stylexRuntime.legacyMerge.defineVars;
stylex.createTheme = stylexRuntime.legacyMerge.createTheme;

export default stylex;
