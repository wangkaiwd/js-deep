// 这里这些代码是如何写出来的？
const webpack = require('./lib');
const options = require('./webpack.config');
const compiler = webpack(options);
compiler.run();
