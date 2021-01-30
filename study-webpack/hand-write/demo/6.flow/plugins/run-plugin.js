class RunPlugin {
  apply (compiler) {
    // 在webpack执行的特定时机来执行这个钩子函数
    compiler.hooks.run.tap('RunPlugin', () => {
      console.log('RUN~~~~~~~~');
    });
  }
}

module.exports = RunPlugin;
