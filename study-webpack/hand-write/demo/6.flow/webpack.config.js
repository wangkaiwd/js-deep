const path = require('path');
const RunPlugin = require('./plugins/run-plugin');
const DonePlugin = require('./plugins/done-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // devtool: 'source-map',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {},
  plugins: [
    new RunPlugin(),
    new DonePlugin()
  ]
};
