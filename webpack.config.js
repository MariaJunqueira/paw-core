const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./main.ts", // Your entry point, make sure it's correct
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
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
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true, // Open the browser after server had been started
  },
};
