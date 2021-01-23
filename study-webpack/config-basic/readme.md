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
  * source-map: 产生.map文件
  * eval: 使用eval包裹模块代码
  * cheap: 不包含列信息，也不包含loader的sourcemap(code -> loader -> bundle)
    ```javascript
    // code
    const fn = () => {
      console.log(1);
    }
    // babel-loader 处理后
    var fn = function() {
      console.log(1)
    }
    // 不添加module关键字，源代码只能从bundle映射到babel-loader处理后的代码，而不能定义到源代码
    ```
  * module: 包含loader的sourcemap(比如babel的sourcemap)，否则无法定义源文件
  * inline: 将.map作为DataURI嵌入，不单独生成.map文件
* import third part library
  * ProvidePlugin
  * expose-loader: expose a module to global object(window,global)
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
  
