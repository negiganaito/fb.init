/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const madge = require("madge");

madge("./src/faang/text-box/work-signin-password-text-box.jsx").then((res) => {
  console.log(res.obj());
});
