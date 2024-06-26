/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import loadable from "@loadable/component";

const Home = loadable(
  () => import(/* webpackChunkName: "HomePage" */ "./router/page"),
  { fallback: <div>1</div> }
);

const About = loadable(
  () => import(/* webpackChunkName: "AboutPage" */ "./router/about/page"),
  { fallback: <div>1</div> }
);

export const routes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: About,
  },
];
