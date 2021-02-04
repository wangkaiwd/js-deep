const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              esModule: false,
              import: false
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
