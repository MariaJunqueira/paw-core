const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./main.ts", // Your entry point, make sure it's correct
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Use contenthash to enable long-term caching
    clean: true, // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Add '.js' if you have JavaScript files
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Path to your HTML entry point
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: true, // Guarantee that index.html will always be returned for any page
    open: true, // Open the browser after server had been started
    headers: {
      "Cache-Control": "max-age=31536000",
    },
  },
};
