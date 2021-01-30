const Compiler = require('./Compiler');

// webpack --env=xxx --mode=xxx
function getCommandLineArg () {
  const argv = process.argv.slice(2);
  return argv.reduce((options, arg) => {
    const { key, val } = arg.split('=');
    options[key.slice(2)] = val;
    return options;
  }, {});
}

function webpack (options) {
  // 将命令行的配置项和webpack.config.js中的配置项进行合并
  const cmdArg = getCommandLineArg();
  options = Object.assign(options, cmdArg);
  const compiler = new Compiler(options);
  const { plugins } = options;
  // 加载所有插件
  // 执行所有的插件，并调用其apply方法，将compiler传入
  plugins.forEach(p => p.apply(compiler));
  return compiler;
}

module.exports = webpack;
