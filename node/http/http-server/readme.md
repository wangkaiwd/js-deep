## package
* [bin](https://docs.npmjs.com/files/package.json#bin)
* [npm link](https://docs.npmjs.com/cli-commands/link.html)
  * 在包文件夹中`npm link`将会在全局文件夹中创建一个符号链接，连接到`npm link`命令被执行位置的包
  * 它也链接任何在包中的`bins`到`prefix/bin/{name}`
* commander
  * Options
    * [how to access passed option by command line?](https://github.com/tj/commander.js/#common-option-types-boolean-and-value)
    * options 中 `--`后边的`long name`将会作为`program`的属性来方便访问
        ```javascript
        program
          .option('-d, --debug', 'output extra debugging')
          .option('-s, --small', 'small pizza size')
          .option('-p, --pizza-type <type>', 'flavour of pizza');
        
        program.parse(process.argv);
        // --debug,--small, --pizaa-type,会以驼峰命名的形式作为program的属性
        if (program.debug) console.log(program.opts());
        console.log('pizza details:');
        if (program.small) console.log('- small pizza size');
        if (program.pizzaType) console.log(`- ${program.pizzaType}`);
        ```
  * custom help
  * version
  * name
* 可以在`bin`中配置多个启动命令：
    ```text
    {
      // ...
      "bin": {
        "ts-static-server": "./bin/www",
        // 配置别名
        "t-s": "./bin/www"
      }
    }
    ```
* 对请求路径进行解码，否则中文会乱码
* 使用`stream`进行文件读取
* ejs:
  * renderFile(filename,data,options,cb)
  * data是一个对象，在`html`中可以直接使用`data`中的属性
  * options是可选的
