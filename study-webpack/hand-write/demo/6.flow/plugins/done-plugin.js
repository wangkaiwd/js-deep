class DonePlugin {
  apply (compiler) {
    compiler.hooks.done.tap('DonePlugin', () => {
      console.log('DONE~~~~~~~~~');
    });
  }
}

module.exports = DonePlugin;
