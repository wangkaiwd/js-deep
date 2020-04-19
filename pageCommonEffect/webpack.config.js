const path = require('path');
const fs = require('fs');
module.exports = {
  mode: 'development',
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
