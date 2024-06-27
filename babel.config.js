/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// eslint-disable-next-line no-undef
const styleXPlugin = require("@stylexjs/babel-plugin");

// eslint-disable-next-line no-undef
const path = require("path");

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isDevelopment = api.env("development");

  return {
    presets: [
      [
        "@babel/preset-env",
        // {
        //   targets: {
        //     browsers: [">0.25%", "not ie 11", "not op_mini all"],
        //   },
        //   // useBuiltIns: "usage",
        //   corejs: 3,
        //   debug: false,
        // },
      ],
      [
        "@babel/preset-react",
        {
          development: isDevelopment,
        },
      ],
      "@babel/preset-typescript",
    ],

    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
        },
      ],
      ["relay"],
      [
        styleXPlugin,
        {
          dev: true,
          test: false,
          unstable_moduleResolution: {
            rootDir: __dirname,
            type: "commonJS",
          },
        },
      ],
      [
        "babel-plugin-fbt",
        {
          // eslint-disable-next-line no-undef
          fbtCommonPath: path.join(__dirname, "i18n/fbt/common_strings.json"),
        },
      ],
      "babel-plugin-fbt-runtime",
      ["macros"],
      isDevelopment && "react-refresh/babel",
    ].filter(Boolean),

    // Applies the react-refresh Babel plugin on non-production modes only
    // ...(!api.env("production") && { plugins: ["react-refresh/babel"] }),
  };
};
