/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { RouterProvider } from "react-router-dom";
import { RelayEnvironment } from "@fb-relay/utils/environment";
import { CometDarkModeStateProvider } from "@fb-theme/components/comet-dark-mode-state-provider";

import { router } from "./router";

export const App = () => {
  return (
    <RelayEnvironment>
      <CometDarkModeStateProvider>
        <RouterProvider router={router} />
      </CometDarkModeStateProvider>
    </RelayEnvironment>
  );
};
