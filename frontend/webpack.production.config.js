const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

require("dotenv").config();

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

    // Seo is done for the fold page but than React-Helmet will take over
    new HtmlWebpackPlugin({
      title:
        "Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali",
      template: "src/index.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1",
        description:
          "Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali",
        keywords: "Bug Tracker RechadSalma ilshaad Kheerdali",
      },
      publicPath: "/",
    }),

    new WorkboxPlugin.GenerateSW(),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env": {
        DOMAIN_AUTH0: JSON.stringify(process.env.DOMAIN_AUTH0),
        CLIENT_ID_AUTH0: JSON.stringify(process.env.CLIENT_ID_AUTH0),
        ADMIN_EMAIL: JSON.stringify(process.env.ADMIN_EMAIL),
        BACKEND_URL: JSON.stringify(process.env.BACKEND_URL),
      },
    }),
  ],
};
