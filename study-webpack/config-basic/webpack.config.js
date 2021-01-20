const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: { // provides you with a simple web server and the ability to use live reloading.
    // contentBase: path.resolve(__dirname, 'dist'), // Tell the server where to serve content from.
    // compress: true, // Enable gzip compress for everything served
    // port: 8080,
    // open: true,
    // writeToDisk: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};
