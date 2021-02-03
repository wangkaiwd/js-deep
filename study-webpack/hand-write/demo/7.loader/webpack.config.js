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
  devServer: {
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: 'babel-loader',
            loader: path.resolve(__dirname, 'loaders/babel-loader'),
            options: {
              include: path.resolve(__dirname, 'src')
            }
          }
        ],
      },
      {
        test: /.(jpg|jpeg|png|gif)/,
        use: [
          {
            loader: path.resolve(__dirname, 'loaders/file-loader'),
            // loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
};

