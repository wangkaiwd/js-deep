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

1. `mycli create dir-name`,如果添加`-f/--froce`选项将会直接覆盖同名目录
2. 提示用户输入`GitHub`用户名
3. 根据用户名展示仓库列表让用户选择
4. 根据用户选择的仓库找出分支列表让用户选择
5. 根据用户选择的仓库名、分支名以及`dir-name`为用户在`dir-name`下下载对应的仓库分支代码

项目依赖：

* [commander](https://github.com/tj/commander.js): `Node.js`命令行界面的完整解决方案
* [inquirer](https://github.com/SBoudrias/Inquirer.js/): 常见的命令行界面交互集合
* [chalk](https://github.com/chalk/chalk): 终端字符串样式
* [ora](https://github.com/sindresorhus/ora): 优雅的终端旋转器
* [download-git-repo](https://www.npmjs.com/package/download-git-repo): 从`node`中下载并提取一个`Git`仓库(`GitHub,GitLab,Bitbuket`)
* [axios](https://github.com/axios/axios): 用于浏览器和`node.js`的基于`http`客户端的`Promise`

项目中需要用到`GitHub API`：

* [List repositories for a user](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-repositories-for-a-user)
* [List branches](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-branches)

### 阅读库文档

* [commander](https://github.com/tj/commander.js)
  * 查看[`Example`](https://github.com/tj/commander.js#examples) ，然后对其中用到的`api`查阅文档中对应的章节，然后尝试修改`Example`
