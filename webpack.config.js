const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const rsdPlugin = require("react-strict-dom/babel");
const StylexPlugin = require("@stylexjs/webpack-plugin");

const envv = require("./scripts/env");

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
          test: /\.(ts|tsx)?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.?(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
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
      new webpack.EnvironmentPlugin(),

      new MiniCssExtractPlugin(),

      new CopyPlugin({
        patterns: [{ from: "./src/faang/assets", to: "faang/assets" }],
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
    ].concat(
      !env.analyze
        ? []
        : [
            new BundleAnalyzerPlugin({
              analyzerHost: "localhost",
              analyzerPort: 3006,
              reportTitle: "Template - Analyze Bundle Sizes",
            }),
          ]
    ),

    optimization: {
      minimize: isProduction,
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

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      allowedHosts: "all",
      client: false,
      devMiddleware: {
        publicPath: `http://localhost:${envv.PORT}/`,
        writeToDisk: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      historyApiFallback: true,
      host: "localhost",
      hot: false,
      https: false,
      open: true,
      port: envv.PORT,
      static: {
        directory: path.join(__dirname, "../build"),
      },
    },
  };
};
