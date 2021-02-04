## Loader

> [Writting a Loader](https://webpack.js.org/contribute/writing-a-loader/)

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20210130212306.png)

* run-loaders
* inline-loader

babel-loader：

* [loader parameters](https://webpack.js.org/api/loaders/#examples)
  * [ast as fourth arguments](https://webpack.js.org/api/loaders/#thiscallback)
* [develop and test a loader locally](https://webpack.js.org/contribute/writing-a-loader/#setup)
* failed: not support sourcemap
* [pitch loader](https://webpack.js.org/api/loaders/#pitching-loader)

file-loader:

* loader-utils
  * getOptions
  * interpolateName
* [raw loader](https://webpack.js.org/api/loaders/#raw-loader)
* [pitch loader](https://webpack.js.org/api/loaders/#pitching-loader)
* this.emitFile
* esModule
* [puzzle code snippet](https://github.com/wangkaiwd/js-deep/blob/46cf3d76f1c1cd1fe40b3222562a5e6c11575e34/study-webpack/hand-write/demo/7.loader/loaders/file-loader.js#L13)

url-loader:

* [Node.js get image from web and encode with base64](https://stackoverflow.com/a/17133012)
* mime-type how to get type?
* use myself file loader
* what is loader function `content` parameter?

style-loader:

* insert style tag

less-loader:

* [less.render](http://lesscss.org/usage/#programmatic-usage)
* this.async

