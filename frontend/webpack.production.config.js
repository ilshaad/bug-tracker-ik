const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin")
const Dotenv = require("dotenv-webpack");
// const webpack = require("webpack");

// require("dotenv").config();
// const DOMAIN_AUTH0 = process.env.DOMAIN_AUTH0,
//   CLIENT_ID_AUTH0 = process.env.CLIENT_ID_AUTH0,
//   TESTINGENV = process.env.TESTINGENV;
// process.env.TESTINGENV)
// "process.env.DOMAIN_AUTH0": process.env.DOMAIN_AUTH0,
//       "process.env.CLIENT_ID_AUTH0": process.env.CLIENT_ID_AUTH0,
//       "process.env.TESTINGENV": process.env.TESTINGENV,

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: false,
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    // splitChunks: { chunks: "all" }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /(\.s[ac]ss$|\.css$)/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "03 production javascript webapck template",
      template: "src/index.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1",
        description: "iK SEO describe",
        keywords:
          "iK SEO keywords, however it might not be necessary because it counts for little for google",
      },
      publicPath: "/",
    }),

    // new WorkboxPlugin.GenerateSW(),

    new Dotenv({ systemvars: true }),

    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: "production", // use 'production' unless process.env.NODE_ENV is defined
    //   DOMAIN_AUTH0: undefined,
    //   CLIENT_ID_AUTH0: undefined,
    //   TESTINGENV: undefined,
    // }),

    // new webpack.EnvironmentPlugin([
    //   "DOMAIN_AUTH0",
    //   "CLIENT_ID_AUTH0",
    //   "TESTINGENV",
    // ]),

    // new webpack.EnvironmentPlugin({
    //   // NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
    //   DOMAIN_AUTH0: process.env.DOMAIN_AUTH0,
    //   CLIENT_ID_AUTH0: process.env.CLIENT_ID_AUTH0,
    //   TESTINGENV: process.env.TESTINGENV,
    // }),

    // new webpack.DefinePlugin({
    //   "process.env": {
    //     DOMAIN_AUTH0: JSON.stringify(DOMAIN_AUTH0),
    //     CLIENT_ID_AUTH0: JSON.stringify(CLIENT_ID_AUTH0),
    //     TESTINGENV: JSON.stringify(TESTINGENV),
    //   },
    // }),

    // new webpack.DefinePlugin({
    //   "process.env.DOMAIN_AUTH0": process.env.DOMAIN_AUTH0,
    //   "process.env.CLIENT_ID_AUTH0": process.env.CLIENT_ID_AUTH0,
    //   "process.env.TESTINGENV": process.env.TESTINGENV,
    // }),
  ],
};
