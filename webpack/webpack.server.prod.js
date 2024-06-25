/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const nodeExternals = require("webpack-node-externals");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");

const webpack = require("webpack");
const { paths } = require("../scripts/utils");
const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    server: [paths.srcServer],
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],

    alias: {
      "@": path.resolve(__dirname, "../src"),
      "~": path.resolve(__dirname, "../public"),
      //
      "@fb-theme": path.resolve(__dirname, "../src/fb/theme"),
      "@fb-util": path.resolve(__dirname, "../src/fb/utils"),
    },

    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
    },
  },
  output: {
    path: paths.serverBuild,
    filename: "index.js",
    publicPath: process.env.STATIC_FILES_URL
      ? `${process.env.STATIC_FILES_URL}${paths.publicPath}`
      : `${paths.publicPath}`,
    // libraryTarget: "commonjs2",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.BROWSER": "false",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BACKEND_BASE_URL": JSON.stringify(
        process.env.BACKEND_BASE_URL
      ),
      "process.env.STATIC_FILES_URL": JSON.stringify(
        process.env.STATIC_FILES_URL
      ), // just used in src/server/renderFullPage.ts
      "process.env.ASSETS_URL": JSON.stringify(process.env.ASSETS_URL),
    }),
    rsdPlugin,
    new StylexPlugin({
      filename: "styles.[contenthash].css",
      dev: false,
      importSources: [
        "@stylexjs/stylex",
        { from: "react-strict-dom", as: "css" },
      ],
      runtimeInjection: false,
      classNamePrefix: "x",
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: __dirname,
      },
    }),
  ],
  externals: [nodeExternals()],
  module: require("./loaders.server.js"),
  stats: "normal",
};
