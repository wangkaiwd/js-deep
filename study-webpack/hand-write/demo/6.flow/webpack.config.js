const path = require('path');
const RunPlugin = require('./plugins/run-plugin');
const DonePlugin = require('./plugins/done-plugin');
const absPath = (dir) => path.join(__dirname, dir);
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  context: process.cwd(),
  // devtool: 'source-map',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          absPath('loaders/logger1-loader.js'),
          absPath('loaders/logger2-loader.js')
        ]
      }
    ]
  },
  plugins: [
    new RunPlugin(),
    new DonePlugin()
  ]
};
