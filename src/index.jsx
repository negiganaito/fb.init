/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ReactDOM from "react-dom/client";
// inject({
//   classNamePrefix: "x",
//   dev: true,
//   test: false,
// });
import { RelayEnvironment } from "@fb-relay/utils/environment";
import { CometDarkMode } from "@fb-theme/utils/comet-dark-mode";
import { CometStyleXSheet } from "@fb-theme/utils/comet-stylex-sheet";

// import inject from "@stylexjs/dev-runtime";
import "../i18n/fbtInit";

import { App } from "./app";

import "./styles/app.css";

const rootElement = document.getElementById("root");

if (!rootElement.innerHTML) {
  CometDarkMode.initDarkMode();
  CometStyleXSheet.rootStyleSheet.injectTheme();

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RelayEnvironment>
      <App />
    </RelayEnvironment>
  );
}
