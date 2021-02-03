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

url-loader:

* loader.raw

style-loader:

less-loader:

* this.async
