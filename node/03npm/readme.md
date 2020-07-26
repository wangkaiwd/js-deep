## `npm`的使用
> `yarn`同理

* npm init
* [全局模块和局部模块](https://nodejs.org/en/blog/npm/npm-1-0-global-vs-local-installation/)
  * 为什么全局模块可以在命令行的任何地方使用
  * package.json, bin
  * node shebang
* npm link
  * 可以方便的在全局安装自己写的`package`，进行测试。而不用每次重新发布到`npm`，再进行全局安装
* [npm version](https://classic.yarnpkg.com/en/docs/cli/version/): [semver specification](https://classic.yarnpkg.com/en/docs/dependency-versions/)
  * relevant between npm version and git tag
* script
  * shortcut
  * 执行命令 (如`{ start: webpack-dev-server }`)
* [npx](https://github.com/npm/npx#readme)
* [publish package](https://classic.yarnpkg.com/en/docs/cli/publish/)
