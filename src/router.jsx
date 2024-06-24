/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "./router/layout";
import { HomePage } from "./router/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
