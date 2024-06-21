/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.ASSET_PATH = "/";

const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../webpack.config.legacy");
const env = require("./env");
const path = require("path");

config.entry = [
  "webpack/hot/dev-server",
  // eslint-disable-next-line max-len
  `webpack-dev-server/client?hot=true&live-reload=true&hostname=localhost&port=${env.PORT}`,
  config.entry,
];

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    allowedHosts: "all",
    client: false,
    devMiddleware: {
      publicPath: `http://localhost:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    host: "localhost",
    hot: false,
    https: false,
    open: true,
    port: env.PORT,
    static: {
      directory: path.join(__dirname, "../build"),
    },
  },
  compiler
);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}

(async () => {
  await server.start();
})();
