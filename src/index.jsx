/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// import { CometDarkMode } from "@fb-theme/utils/comet-dark-mode";
// import { CometStyleXSheet } from "@fb-theme/utils/comet-stylex-sheet";
// import { isClient } from "@fb-util/executionEnvironment";
import { loadableReady } from "@loadable/component";

import "../i18n/fbtInit";

import { App } from "./app";

import "./styles/app.css";

// const rootElement = document.getElementById("root");

// if (!rootElement.innerHTML) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// }

const Main = () => {
  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
};

const bootstrapClientApp = () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    const domNode = document.querySelector("#root");
    if (domNode) {
      // if (isClient()) {
      //   CometDarkMode.initDarkMode();
      //   CometStyleXSheet.rootStyleSheet.injectTheme();
      // }

      loadableReady(() => {
        hydrateRoot(
          domNode,
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        );
      });
    }
  } else {
    // We don't want Google Cache to use our bundles JS and make whatever he wants with it
    console.error("Forbidden hostname");
  }
};

bootstrapClientApp();
