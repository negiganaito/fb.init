/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
require("dotenv").config();

module.exports = (env) => {
  if (typeof env !== "undefined" && env === "development") {
    return [require("./webpack.client.dev"), require("./webpack.server.dev")];
  }
  return [require("./webpack.client.prod"), require("./webpack.server.prod")];
};
