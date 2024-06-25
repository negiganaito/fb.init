/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const webpack = require("webpack");
const nodemon = require("nodemon");
const rimraf = require("rimraf");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack")("development");
const cors = require("cors");

const { compilerListener, paths, compilation } = require("./utils");

const PORT = 3001;

const withSsr = false;

const app = express();

const start = async () => {
  try {
    rimraf.sync(paths.dist);

    const [clientConfig, serverConfig] = webpackConfig;

    clientConfig.entry.bundle = [
      `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&timeout=2000`,
      ...clientConfig.entry.bundle,
    ];
    clientConfig.output.hotUpdateMainFilename =
      "updates/[fullhash].hot-update.json";
    clientConfig.output.hotUpdateChunkFilename =
      "updates/[id].[fullhash].hot-update.js";

    // const multiCompiler = webpack([clientConfig, withSsr && serverConfig]);

    const multiCompiler = webpack([clientConfig, serverConfig]);
    console.log({ 1: multiCompiler.compilers });

    const clientCompiler = multiCompiler.compilers.find(
      (compiler) => compiler.options.target === "web"
    );
    // const serverCompiler = multiCompiler.compilers.find(
    //   (compiler) => compiler.options.target === "node"
    // );

    app.use(cors());

    // app.use(
    //   webpackDevMiddleware(clientCompiler, {
    //     publicPath: clientConfig.output.publicPath,
    //     stats: clientConfig.stats,
    //     writeToDisk: true,
    //   })
    // );

    // app.use(
    //   webpackHotMiddleware(clientCompiler, {
    //     log: false,
    //     path: "/__webpack_hmr",
    //     heartbeat: 2000,
    //   })
    // );

    // serverCompiler.watch(
    //   {
    //     ignored: /node_modules/,
    //     poll: 1000, // Check for changes every second
    //     aggregateTimeout: 200,
    //   },
    //   (err, stats) => compilation(err, stats, serverConfig.stats)
    // );

    await Promise.all([
      compilerListener("client", clientCompiler),
      // compilerListener("server", serverCompiler),
    ]);

    app.listen(PORT, (err) => {
      if (err) console.error(err);
      else console.log(`Hot dev server middleware port : ${PORT} 🌎`);
    });

    // const script = nodemon({
    //   script: `${paths.serverBuild}/index.js`,
    //   ignore: [
    //     "src",
    //     "webpack",
    //     "scripts",
    //     `${paths.clientBuild}`,
    //     "public",
    //     "node_modules",
    //   ], // We just want paths.serverBuild to be watched
    //   delay: 100, // take into account serverCompiler changes
    // });

    // script.on("restart", () => {
    //   console.log("Server side app has been restarted");
    // });

    // script.on("quit", () => {
    //   console.log("Process ended");
    //   process.exit();
    // });

    // script.on("error", () => {
    //   console.log("An error occured. Exiting");
    //   process.exit(1);
    // });
  } catch (error) {
    console.error(error);
  }
};

start();
