const path = require('path');
const fs = require('fs');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry () {
    const entries = fs.readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true }).reduce((count, item) => {
      if (item.isDirectory() && item.name.includes('demo')) {
        const filepath = path.resolve(__dirname, 'src', item.name, 'demo.ts');
        fs.existsSync(filepath) && (count[item.name] = filepath);
      }
      return count;
    }, {});
    return {
      index: path.resolve(__dirname, 'src/index.ts'),
      ...entries,
    };
  },
  devServer: {
    // Tell the server where to serve content from. 告诉服务器提供内容的位置
    contentBase: './',
    // will be used to determine where the bundles should be served from, and takes precedence.
    // 将会被用来决定bundle文件被提供的位置并且优先处理
    publicPath: '/build/',
    // @see: https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
    // dev-server 检测通过devServer.contentBase选项提供的文件服务。它默认是被禁用的。
    // 当被开启后，文件改变将会触发真个页面更新

    // 以下选项都被开启后才能改变html后刷新页面
    watchContentBase: true,
    hot: true,
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
