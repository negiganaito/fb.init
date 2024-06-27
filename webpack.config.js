/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const envv = require("./scripts/env");
const TerserPlugin = require("terser-webpack-plugin");

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

module.exports = (env, { mode }) => {
  const isProduction = mode === "production";
  const isDevelopment = mode !== "production";

  return {
    mode,
    entry: path.join(__dirname, "src", "index.jsx"),
    target: "web",
    resolve: {
      // extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensions: fileExtensions
        .map((extension) => "." + extension)
        .concat([".js", ".jsx", ".ts", ".tsx", ".css"]),

      alias: {
        "@": path.resolve(__dirname, "src/"),
        "~": path.resolve(__dirname, "/public"),

        //
        "@fb-text": path.resolve(__dirname, "src/fb/text"),
        "@fb-context": path.resolve(__dirname, "src/fb/contexts"),
        "@fb-hook": path.resolve(__dirname, "src/fb/hooks"),
        "@fb-util": path.resolve(__dirname, "src/fb/utils"),
        "@placeholder": path.resolve(__dirname, "src/fb/placeholder"),
        "@fb-layout": path.resolve(__dirname, "src/fb/layout"),
        "@fb-unknown": path.resolve(__dirname, "src/fb/unknown"),
        "@fb-user-agent": path.resolve(__dirname, "src/fb/user-agent"),
        "@fb-event-interaction": path.resolve(
          __dirname,
          "src/fb/event-interaction"
        ),
        "@fb-keyboard": path.resolve(__dirname, "src/fb/keyboard"),
        "@fb-constants": path.resolve(__dirname, "src/fb/constants"),
        "@fb-focus": path.resolve(__dirname, "src/fb/focus"),
        "@fb-contextual-layer": path.resolve(
          __dirname,
          "src/fb/contextual-layer"
        ),
        "@fb-image": path.resolve(__dirname, "src/fb/image"),
        "@fb-glimmer": path.resolve(__dirname, "src/fb/glimmer"),
        "@fb-process-ring": path.resolve(__dirname, "src/fb/process-ring"),
        "@fb-tooltip": path.resolve(__dirname, "src/fb/tooltip"),
        "@fb-card": path.resolve(__dirname, "src/fb/card"),

        "@fb-pressable": path.resolve(__dirname, "src/fb/pressable"),
        "@fb-link": path.resolve(__dirname, "src/fb/link"),
        "@fb-button": path.resolve(__dirname, "src/fb/button"),
        "@fb-form-input": path.resolve(__dirname, "src/fb/form-input"),
        "@fb-icons": path.resolve(__dirname, "src/fb/icons"),
        "@fb-comps": path.resolve(__dirname, "src/fb/_comp"),
        "@fb-select": path.resolve(__dirname, "src/fb/select"),
        "@fb-view": path.resolve(__dirname, "src/fb/view"),
        "@fb-menu-popover": path.resolve(__dirname, "src/fb/menu-popover"),
        "@fb-cell": path.resolve(__dirname, "src/fb/cell"),
        "@fb-list": path.resolve(__dirname, "src/fb/list"),
        "@fb-dialog": path.resolve(__dirname, "src/fb/dialog"),
        "@fb-toast": path.resolve(__dirname, "src/fb/toast"),
        "@fb-network": path.resolve(__dirname, "src/fb/network"),
        "@fb-callout": path.resolve(__dirname, "src/fb/callout"),
        "@fb-checkbox-radio": path.resolve(__dirname, "src/fb/checkbox-radio"),
        "@fb-collapse": path.resolve(__dirname, "src/fb/collapse"),
        "@fb-text-area": path.resolve(__dirname, "src/fb/text-area"),
        "@fb-file-selector": path.resolve(__dirname, "src/fb/file-selector"),
        "@fb-lazy-load-component": path.resolve(
          __dirname,
          "src/fb/lazy-load-component"
        ),
        "@fb-platform": path.resolve(__dirname, "src/fb/platform"),
        "@fb-comet-root": path.resolve(__dirname, "src/fb/comet-root"),

        "@fb-badge": path.resolve(__dirname, "src/fb/badge"),
        "@fb-switch": path.resolve(__dirname, "src/fb/switch"),
        "@fb-error": path.resolve(__dirname, "src/fb/error"),
        "@fb-theme": path.resolve(__dirname, "src/fb/theme"),
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
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: isProduction ? "js/[name].[chunkhash].js" : "js/[name].js",
      chunkFilename: isProduction ? "js/[name].[chunkhash].js" : "js/[name].js",
    },

    module: {
      rules: [
        {
          test: /\.?(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "source-map-loader",
            },
            {
              loader: "babel-loader",
              options: {
                // presets: [
                //   // "@babel/preset-env",
                //   //   "@babel/preset-react",
                //   //   "@babel/preset-typescript",
                //   ["@babel/preset-env"],
                //   [
                //     "@babel/preset-react",
                //     {
                //       development: isDevelopment,
                //       runtime: "automatic",
                //     },
                //   ],
                //   "@babel/preset-typescript",
                // ],
                configFile: path.join(__dirname, "babel.config.js"),
                // plugins: [isDevelopment && "react-refresh/babel"].filter(
                //   Boolean
                // ),
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
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",

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
    },

    cache: true,

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        minify: isProduction,
        hash: isProduction,
        cache: isProduction,
        showErrors: !isProduction,
      }),

      new Dotenv({
        systemvars: true,
      }),

      new CleanWebpackPlugin({ verbose: false }),

      new webpack.ProgressPlugin(),
      // new webpack.EnvironmentPlugin(["NODE_ENV"]),

      new webpack.EnvironmentPlugin({
        NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      }),

      new MiniCssExtractPlugin(),

      new CopyPlugin({
        patterns: [{ from: "./src/fb/assets", to: "fb/assets" }],
      }),

      rsdPlugin,
      // Ensure that the stylex plugin is used before Babel
      new StylexPlugin({
        filename: "styles.[contenthash].css",
        // get webpack mode and set value for dev
        dev: mode === "development",
        importSources: [
          "@stylexjs/stylex",
          { from: "react-strict-dom", as: "css" },
        ],
        // Use statically generated CSS files and not runtime injected CSS.
        // Even in development.
        runtimeInjection: false,
        // optional. default: 'x'
        classNamePrefix: "x",
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: "commonJS",
          // The absolute path to the root directory of your project
          rootDir: __dirname,
        },
      }),

      isDevelopment && new ReactRefreshWebpackPlugin(),
    ]
      .concat(
        !env.analyze
          ? []
          : [
              new BundleAnalyzerPlugin({
                analyzerHost: "localhost",
                analyzerPort: 3006,
                reportTitle: "Template - Analyze Bundle Sizes",
              }),
            ]
      )
      .filter(Boolean),

    optimization: {
      minimize: isProduction,
      mergeDuplicateChunks: true,
      removeEmptyChunks: true,
      sideEffects: false,
      minimizer: [
        // new ESBuildMinifyPlugin({
        //   target: "es2015",
        // }),
        new TerserPlugin({
          extractComments: false,
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

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      allowedHosts: "all",
      // client: false,
      devMiddleware: {
        publicPath: `http://localhost:${envv.PORT}/`,
        writeToDisk: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      historyApiFallback: true,
      host: "localhost",
      hot: true,
      https: false,
      open: true,
      port: envv.PORT,
      static: {
        directory: path.join(__dirname, "build"),
      },
    },

    stats: {
      errorDetails: true,
    },
  };
};
