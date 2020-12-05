## cli

* [npm-link](https://docs.npmjs.com/cli/v6/commands/npm-link)
  * 在一个包文件目录下，执行`npm link`，将在全局`{prefix}/lib/node_modules/<package>`创建一个符号连接到执行命令的包
  * `package`中的`bin`(执行命令)也会链接到`{prefix}/bin/{name}`
  * 在其它项目中执行`npm link package-name`将会创建一个从全局安装的`package-name`到当前目录`node_modules/`的一个连接符号
  * 当包文件在本地进行修改后，对应用到的位置也会有相应的更新，方便测试，而不用每次都重新发布到`npm`，然后下载进行测试
* 实际使用场景：开发工具或库，这样我们在本地代码更新后，对应用到的地方也会自动更新，方便测试
  * 开发一个工具，会提供一个命令行的命令供用户执行
    * npm link可以将该命令直接链接到全局，方便开发者进行开发
  * 开发一个库，供用户在自己的项目中使用
    * 在库文件下，执行`npm link`将库链接到全局
    * 在需要用库的项目文件下，执行`npm link package-name`来将库链接到当前项目的`node_modules/`中

### 需求

1. 配置可执行命令 commander
2. 命令行交互 inquirer
3. 远程下载模板
4. 根据用户选项动态生成内容
