## webpack configuration

* [raw-loader](https://webpack.js.org/loaders/raw-loader/): A loader for webpack that allows importing files as a
  String.
* webpack-dev-server
  * theory: [memfs](https://github.com/streamich/memfs)
* css-loader style-loader
* file-loader,url-loader,html-loader
  * require,import: (`file-loader,url-loader`)
  * 在`html`中直接通过`img src`引入(`html-loader`)
  * 放在静态文件根目录里，直接通过`img src`使用(`webpack-dev-server`)
* babel-loader
  * polyfill: polyfill-service, polyfill.io通过分析请求头中的`UserAgent`实现自动加载浏览器所需的`pollyfills`
  * preset-env [useBuiltIns](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage): 只加载用到新语法的polyfill
* eslint
* sourcemap
  * 如何调试线上代码？
* import third part library
  * ProvidePlugin
  * expose-loader
  * externals
  * html-webpack-externals-plugin
* Authoring Library:

### English

* token: 符号；标记；令牌

### Question

* webpack-dev-server
  * contentBase
  * publicPath
* output:
  * publicPath
  
