const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-cheap-source-map',
  output: { path: path.resolve(__dirname, 'dist') },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'source')],
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue Source',/* Load a custom template (lodash by default)*/
      template: 'index.html'
    })
  ],
  devServer: { contentBase: './dist' },
};
