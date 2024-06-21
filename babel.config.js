/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const rsdPlugin = require("react-strict-dom/babel");

// eslint-disable-next-line no-undef
const styleXPlugin = require("@stylexjs/babel-plugin");

// eslint-disable-next-line no-undef
const path = require("path");

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        "@babel/preset-react",
        // {
        //   development: true,
        // },
      ],
    ],

    plugins: [
      ["relay"],
      ["react-hot-loader/babel"],
      // rsdPlugin,
      [
        styleXPlugin,
        {
          dev: true,
          // Set this to true for snapshot testing
          // default: false
          // importSources: [
          //   "@stylexjs/stylex",
          //   { from: "react-strict-dom", as: "css" },
          // ],
          test: false,
          // Required for CSS variable support
          unstable_moduleResolution: {
            // The absolute path to the root directory of your project
            // eslint-disable-next-line no-undef
            rootDir: __dirname,

            // type: 'commonJS' | 'haste'
            // default: 'commonJS'
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
      "react-refresh/babel",
    ],

    // Applies the react-refresh Babel plugin on non-production modes only
    // ...(!api.env("production") && { plugins: ["react-refresh/babel"] }),
  };
};
