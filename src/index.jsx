/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ReactDOM from "react-dom/client";

// import inject from "@stylexjs/dev-runtime";
import "../i18n/fbtInit";

import "./styles/app.css";

// inject({
//   classNamePrefix: "x",
//   dev: true,
//   test: false,
// });

const rootElement = document.getElementById("root");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<div>Hello</div>);
}
