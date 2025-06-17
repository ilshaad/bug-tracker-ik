const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshBabel = require("react-refresh/babel");
const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

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
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Seo is done for the fold page but than React-Helmet will take over
    new HtmlWebpackPlugin({
      title:
        "Bug Tracker (DevMode) - Github user: RechadSalma | Developer: ilshaad Kheerdali",
      template: "src/index.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1",
        description:
          "Bug Tracker (DevMode) - Github user: RechadSalma | Developer: ilshaad Kheerdali",
        keywords: "Bug Tracker RechadSalma ilshaad Kheerdali",
      },
      publicPath: "/",
    }),

    new ReactRefreshWebpackPlugin(),

    // ! IK UNCOMMENT WHEN YOU FINISH TO TURN ON PWA
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   maximumFileSizeToCacheInBytes: 50000000,
    // }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env": {
        DOMAIN_AUTH0: JSON.stringify(process.env.DOMAIN_AUTH0),
        CLIENT_ID_AUTH0: JSON.stringify(process.env.CLIENT_ID_AUTH0),
        ADMIN_EMAIL: JSON.stringify(process.env.ADMIN_EMAIL),
        BACKEND_URL: JSON.stringify(process.env.BACKEND_URL),
      },
    }),
  ],
};
