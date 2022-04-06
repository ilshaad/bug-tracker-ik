const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshBabel = require("react-refresh/babel");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const webpack = require("webpack");

require("dotenv").config();

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: false,
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [ReactRefreshBabel],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            // options: babelOptions
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /(\.s[ac]ss$|\.css$)/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "03 development javascript webapck template",
      template: "src/index.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1",
        description: "iK SEO describe",
        keywords:
          "iK SEO keywords, however it might not be necessary because it counts for little for google",
      },
      publicPath: "/",
    }),
    new ReactRefreshWebpackPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   maximumFileSizeToCacheInBytes: 5000000,
    // }),
    new Dotenv({ systemvars: true }),

    // new webpack.EnvironmentPlugin({
    //   // NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
    //   DOMAIN_AUTH0: process.env.DOMAIN_AUTH0,
    //   CLIENT_ID_AUTH0: process.env.CLIENT_ID_AUTH0,
    //   TESTINGENV: process.env.TESTINGENV,
    // }),

    // new webpack.EnvironmentPlugin([
    //   "DOMAIN_AUTH0",
    //   "CLIENT_ID_AUTH0",
    //   "TESTINGENV",
    // ]),

    // new webpack.DefinePlugin({
    //   "process.env.DOMAIN_AUTH0": JSON.stringify(process.env.DOMAIN_AUTH0),
    //   "process.env.CLIENT_ID_AUTH0": JSON.stringify(
    //     process.env.CLIENT_ID_AUTH0
    //   ),
    //   "process.env.TESTINGENV": JSON.stringify(process.env.TESTINGENV),
    // }),
  ],
};
