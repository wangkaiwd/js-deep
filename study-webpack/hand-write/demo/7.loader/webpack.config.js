const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
};

