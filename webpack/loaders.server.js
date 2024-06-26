/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  rules: [
    {
      test: /\.?(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      ],
    },
    {
      test: /\.(ts|tsx)?$/,
      use: ["babel-loader"],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    autoprefixer: {
                      grid: true,
                      flexbox: true,
                    },
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(png|jp(e*)g|gif|webp|avif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            native: false,
          },
        },
      ],
    },
  ],
};
