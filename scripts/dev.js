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

const app = express();

const start = async () => {
  try {
    // Clear the distribution directory
    rimraf.sync(paths.dist);

    // Load client and server configurations
    const [clientConfig, serverConfig] = webpackConfig;

    // Append hot-reload entry points for client configuration
    clientConfig.entry.bundle = [
      `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&timeout=2000`,
      ...clientConfig.entry.bundle,
    ];

    // Set unique filenames for hot updates
    clientConfig.output.hotUpdateMainFilename =
      "updates/[fullhash].hot-update.json";
    clientConfig.output.hotUpdateChunkFilename =
      "updates/[id].[fullhash].hot-update.js";
    clientConfig.output.filename = "[name].[fullhash].js"; // Ensuring unique filenames for client output
    // Similarly set unique filenames for server configuration
    // serverConfig.output.filename = "[name].[fullhash].js"; // Ensuring unique filenames for server output

    const multiCompiler = webpack([clientConfig, serverConfig]);

    // Extract individual compilers for client and server
    const clientCompiler = multiCompiler.compilers.find(
      (compiler) => compiler.options.target === "web"
    );
    const serverCompiler = multiCompiler.compilers.find(
      (compiler) => compiler.options.target === "node"
    );

    app.use(cors());

    // Setup webpack-dev-middleware for the client compiler
    app.use(
      webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: clientConfig.stats,
        writeToDisk: true,
      })
    );

    // Setup webpack-hot-middleware for the client compiler
    app.use(
      webpackHotMiddleware(clientCompiler, {
        log: false,
        path: "/__webpack_hmr",
        heartbeat: 2000,
      })
    );

    // Watch for changes in the server compiler
    serverCompiler.watch(
      {
        ignored: /node_modules/,
        poll: 1000, // Check for changes every second
        aggregateTimeout: 200,
      },
      (err, stats) => compilation(err, stats, serverConfig.stats)
    );

    // Listen for compilation completion
    await Promise.all([
      compilerListener("client", clientCompiler),
      compilerListener("server", serverCompiler),
    ]);

    app.listen(PORT, (err) => {
      if (err) console.error(err);
      else console.log(`Hot dev server middleware port : ${PORT} 🌎`);
    });

    // Setup nodemon to restart the server on changes
    const script = nodemon({
      script: `${paths.serverBuild}/index.js`,
      ignore: [
        "src",
        "webpack",
        "scripts",
        `${paths.clientBuild}`,
        "public",
        "node_modules",
      ], // We just want paths.serverBuild to be watched
      delay: 100, // take into account serverCompiler changes
    });

    script.on("restart", () => {
      console.log("Server side app has been restarted");
    });

    script.on("quit", () => {
      console.log("Process ended");
      process.exit();
    });

    script.on("error", () => {
      console.log("An error occured. Exiting");
      process.exit(1);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
