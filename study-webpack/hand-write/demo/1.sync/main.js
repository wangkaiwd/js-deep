// webpack implement nodejs module.exports and require
(() => { // build source code
  const modules = {
    './src/title.js': (module) => {
      module.exports = 'title';
    }
  };
  const cache = {};

  function _require (moduleId) {
    const cacheModule = cache[moduleId];
    if (cacheModule) { return cacheModule; }
    const module = cache[moduleId] = { exports: {} };
    modules[moduleId].call(module, module, module.exports, require);
    return module.exports;
  }

  // index.js: self execute function avoid pollute global variables
  (() => {
    const title = _require('./src/title.js');
    console.log('title', title);
  })();
})();
