/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");

const webpack = require("webpack");
const { paths } = require("../scripts/utils");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    bundle: [paths.srcClient],
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
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: "bundle-[fullhash].js",
    publicPath: process.env.STATIC_FILES_URL
      ? `${process.env.STATIC_FILES_URL}${paths.publicPath}`
      : `${paths.publicPath}`,
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.BROWSER": "true",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BACKEND_BASE_URL": JSON.stringify(
        process.env.BACKEND_BASE_URL
      ),
      "process.env.ASSETS_URL": JSON.stringify(process.env.ASSETS_URL),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "webpack-report.html",
      openAnalyzer: false,
    }),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/fb/assets", to: "fb/assets" }],
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
    new CompressionPlugin({ algorithm: "gzip" }),
  ],
  stats: "minimal",
  cache: true,
  module: require("./loaders.client.js"),

  optimization: {
    minimize: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    sideEffects: false,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true,
          name: (module) => {
            const [, match] = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]([^\\/]*)([\\/]([^\\/]*))?([\\/]([^\\/]*))?|$)/
            );

            return `vendors/${match.replace("@", "")}`;
          },
        },
      },
    },
  },

  performance: {
    maxEntrypointSize: Infinity,
    maxAssetSize: 1024 ** 2,
  },
};
