/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");
// const { ESBuildMinifyPlugin } = require("esbuild-loader");
const LoadablePlugin = require("@loadable/webpack-plugin");

const moduleLoaders = require("./loaders.client");

const webpack = require("webpack");
const { paths } = require("../scripts/utils");
const { StyleXPlugin } = require("stylex-webpack");

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: {
    bundle: [paths.srcClient],
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: "bundle.js",
    publicPath: paths.publicPath,
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

  module: moduleLoaders,

  plugins: [
    new LoadablePlugin(),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/fb/assets", to: "fb/assets" }],
    }),
    new webpack.DefinePlugin({
      "process.env.BROWSER": "true",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BACKEND_BASE_URL": JSON.stringify(
        process.env.BACKEND_BASE_URL
      ),
      "process.env.ASSETS_URL": JSON.stringify(process.env.ASSETS_URL),
    }),

    rsdPlugin,
    // new StylexPlugin({
    //   filename: "styles.[contenthash].css",
    //   dev: true,
    //   importSources: [
    //     "@stylexjs/stylex",
    //     { from: "react-strict-dom", as: "css" },
    //   ],
    //   runtimeInjection: false,
    //   classNamePrefix: "x",
    //   unstable_moduleResolution: {
    //     type: "commonJS",
    //     rootDir: __dirname,
    //   },
    // }),
    new StyleXPlugin({
      stylexOption: {
        dev: true,
      },
    }),
  ],
  stats: "minimal",
  cache: true,

  // optimization: {
  //   minimize: false,
  //   mergeDuplicateChunks: true,
  //   removeEmptyChunks: true,
  //   sideEffects: false,
  //   minimizer: [
  //     new ESBuildMinifyPlugin({
  //       target: "es2015",
  //     }),
  //   ],
  //   splitChunks: {
  //     chunks: "all",
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: "all",
  //         enforce: true,
  //         name: (module) => {
  //           const [, match] = module.context.match(
  //             /[\\/]node_modules[\\/](.*?)([\\/]([^\\/]*)([\\/]([^\\/]*))?([\\/]([^\\/]*))?|$)/
  //           );

  //           return `vendors/${match.replace("@", "")}`;
  //         },
  //       },
  //     },
  //   },
  // },

  // performance: {
  //   maxEntrypointSize: Infinity,
  //   maxAssetSize: 1024 ** 2,
  // },
};
