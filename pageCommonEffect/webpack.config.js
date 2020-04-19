const path = require('path');
module.exports = {
  mode: 'development',
  entry: { index: './src/index.ts', demo: './src/demo01/demo.ts' },
  devServer: {
    // Tell the server where to serve content from. 告诉服务器提供内容的位置
    contentBase: './',
    // will be used to determine where the bundles should be served from, and takes precedence.
    // 将会被用来决定bundle文件被提供的位置并且优先处理
    publicPath: '/build/',
    //
    watchContentBase: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};
