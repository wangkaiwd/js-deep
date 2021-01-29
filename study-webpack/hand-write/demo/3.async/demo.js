const installedChunks = {};
const modules = {};
const cache = {};

function _require (moduleId) {
  const module = cache[moduleId] = {
    exports: {}
  };

}

_require.f = {};
_require.l = function () {

};
_require.f.j = function (chunkId, promises) {
  let installedChunkData = installedChunks[chunkId];
  const promise = new Promise((resolve, reject) => {
    installedChunkData = installedChunks[chunkId] = [resolve, reject];
  });
  promises.push(promise);
};
_require.e = function (chunkId) {

};

const p = _require.e('src_title_02_js').then(_require.bind(_require, './src/title02.js'));

p.then((result) => {
  console.log('title', result);
});
