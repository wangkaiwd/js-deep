## package
* [bin](https://docs.npmjs.com/files/package.json#bin)
* [npm link](https://docs.npmjs.com/cli-commands/link.html)
  * 在包文件夹中`npm link`将会在全局文件夹中创建一个符号链接，连接到`npm link`命令被执行位置的包
  * 它也链接任何在包中的`bins`到`prefix/bin/{name}`
* commander
