const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CdnWebpackPlugin = require("./plugins/cdn-webpack-plugin");

/**@type webpack.Configuration */
const webpackConfig = {
  mode: "production",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(), new CdnWebpackPlugin('http://localhost:3000/cdn'), new MiniCssExtractPlugin()],
  stats: "minimal"
};

module.exports = webpackConfig;
