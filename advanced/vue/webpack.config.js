const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolvemodules
    // 如果配置为相对路径，会递归查找对应的父级目录
    // 如果为绝对路径，只会在指定的目录中查找
    // modules: 在解析模块的时候，告诉webpack应该在哪些文件夹中查找
    modules: [path.resolve(__dirname, 'source'), 'node_modules']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    contentBase: './build'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Little Vue',
      // Load a custom template (lodash by default)
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
};
