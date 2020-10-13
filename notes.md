## 组件库发布
* [打包为库文件](https://cli.vuejs.org/guide/build-targets.html#library)
* 在模块下执行npm link，全局会有该模块，而且在其它模块下的`node_modules`中也会出现临时的该模块，并且会随着模块的更新而更新，可以直接在其它项目中通过`import`引入使用。

