/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const nodeExternals = require("webpack-node-externals");

const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");
const path = require("path");

const webpack = require("webpack");
const { paths } = require("../scripts2/utils");

module.exports = {
  mode: "development",
  target: "node",
  entry: {
    server: [paths.srcServer],
  },
  output: {
    path: paths.serverBuild,
    filename: "index.js",
    publicPath: paths.publicPath,
    // libraryTarget: "commonjs2",
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

  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.BROWSER": "false",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BACKEND_BASE_URL": JSON.stringify(
        process.env.BACKEND_BASE_URL
      ),
      "process.env.ASSETS_URL": JSON.stringify(process.env.ASSETS_URL),
    }),
    rsdPlugin,
    new StylexPlugin({
      filename: "styles.[contenthash].css",
      dev: true,
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
  stats: "minimal",
  externals: [nodeExternals()],
  module: require("./loaders.server")({
    isProduction: false,
  }),
};
