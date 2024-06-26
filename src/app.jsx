/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { CometDarkModeStateProvider } from "@fb-theme/components/comet-dark-mode-state-provider";

import { routes } from "./router";

export const App = () => {
  return (
    <CometDarkModeStateProvider>
      <Routes>
        {routes.map(({ Component, path }, i) => (
          <Route path={path} key={i} element={<Component />} />
        ))}
      </Routes>
    </CometDarkModeStateProvider>
  );
};
