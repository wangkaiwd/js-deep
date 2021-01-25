const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new CleanWebpackPlugin()
  ]
};
