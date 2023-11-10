const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        exclude: path.resolve(__dirname, "src/app"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.scss$/i,
        include: path.resolve(__dirname, "src/app"),
        type: "asset/source",
        use: ["sass-loader"],
      },
      {
        test: /\.css$/i,
        exclude: path.resolve(__dirname, "src/app"), // Exclude CSS from src/app
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src/app"), // Include only CSS from src/app
        type: "asset/source",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({}),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
      // Add other PurgeCSS options here if needed
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/favicon.ico", to: "favicon.ico" }, // Adjust the path as necessary
        { from: "./src/assets", to: "assets" }, // Adjust the path as necessary
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true,
    open: true,
    headers: {
      "Cache-Control": "max-age=31536000",
    },
  },
};
