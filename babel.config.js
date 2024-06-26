/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// const rsdPlugin = require("react-strict-dom/babel");

// eslint-disable-next-line no-undef
const styleXPlugin = require("@stylexjs/babel-plugin");

// eslint-disable-next-line no-undef
const path = require("path");

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const web = api.caller((caller) =>
    Boolean(caller && caller.target === "web")
  );

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: web ? "defaults" : { node: process.versions.node }, // https://babeljs.io/docs/en/options#targets
        useBuiltIns: web ? "usage" : false, // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
        ...(web && { corejs: { version: "3.25", proposals: false } }), // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
        shippedProposals: web,
        debug: false, // https://babeljs.io/docs/en/babel-preset-env#debug
      },
    ],
    [
      "@babel/preset-react",
      {
        development: process.env.NODE_ENV === "development", // https://babeljs.io/docs/en/babel-preset-react/#development
      },
    ],
  ];

  const plugins = [
    "@loadable/babel-plugin",
    ["relay"],
    ["react-hot-loader/babel"],
    // rsdPlugin,
    // [
    //   styleXPlugin,
    //   {
    //     dev: true,
    //     // Set this to true for snapshot testing
    //     // default: false
    //     // importSources: [
    //     //   "@stylexjs/stylex",
    //     //   { from: "react-strict-dom", as: "css" },
    //     // ],
    //     test: false,
    //     // Required for CSS variable support
    //     unstable_moduleResolution: {
    //       // The absolute path to the root directory of your project
    //       // eslint-disable-next-line no-undef
    //       rootDir: __dirname,

    //       // type: 'commonJS' | 'haste'
    //       // default: 'commonJS'
    //       type: "commonJS",
    //     },
    //   },
    // ],
    [
      "babel-plugin-fbt",
      {
        // eslint-disable-next-line no-undef
        fbtCommonPath: path.join(__dirname, "i18n/fbt/common_strings.json"),
      },
    ],
    "babel-plugin-fbt-runtime",
    ["macros"],
  ];

  if (web && process.env.NODE_ENV === "development") {
    plugins.push("react-refresh/babel");
  }

  return {
    presets,
    plugins,
  };
};
