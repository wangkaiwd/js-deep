## `Webpack`初始化流程

* 初始化参数：从配置文件和`Shell`语句中读取并合并参数，得出最终的配置对象
* 用上一步得到的参数初始化`Compiler`对象
* 加载所有配置的插件
* 执行对象的`run`方法开始执行编译
* 根据配置中的`entry`找出入口文件
* 从入口文件出发，调用所有配置的`loader`对模块进行编译
* 找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
* 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的`Chunk`
* 再把每个`Chunk`转换成一个单独的文件加入到输出列表
* 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### 开始编译

* 找到入口文件
  * to unix path(path.posix)
* 分析依赖
  * babel parser
  * babel traverse
  * 利用解析器生成的抽象语法树
  * path.isAbsolute
* 多入口：
  * 根据name来区分不同的module

问题：

* moduleId, chunkId
  * moduleId: 模块的绝对路径相对于项目根目录的相对路径: `./src/title.js`
  * chunkId: `src_title_js`

### 运行流程

* webpack cli -> webpack

问题？

* 命令行执行webpack是如何通过webpack-cli来运行webpack进行打包的？
* 如何进行源代码的调试？
