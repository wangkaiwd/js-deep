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
* 缓存
  * `index.html`无法强制缓存，首页用到的资源可以强制缓存
  * 强制缓存
    * expires: 包含date/time
    * cache-control
      * max-age(second)
      * no-cache: 在浏览器缓存，但是首先要通过服务器的校验
      * no-store: 不缓存
  * 协商缓存(对比缓存)
    * cache-control: no-cache
      * response header: Last-Modified
      * request header: if-modified-since
  * 一起使用
    * cache-control: max-age
    * response header: Last-Modified
    * request header: If-Modified-since
    * max-age 时间内不进行文件比对
      
缓存请求头和响应头： 
* If-Modified-Since: 
  * 只有当它在给定日期之后完成最后一次修改时，服务器将会返回请求资源，状态码为200
  * 如果此后请求没有被修改，响应将会是没有任何主体的304
  * 之前请求的`Last-Modified`响应头将会包含最后修改日期
  * `If-Modified-Since`只能和`GET`或`HEAD`一起使用
* Etag: Last-Modified 并不精准(1s内的修改并不会察觉到)
  * 指纹，独一无二。一个资源特定版本的标识符
  * If-None-Match: 优先级高于If-Modified-Since
  * crypto: digest algorithm

缓存过程：
1. 强制缓存
  * Expires
  * cache-control: 'max-age=10' (单位seconds)
  
2. 协商缓存
  * cache-control: 'no-cache'
  1. 先比较 fingerprint (ETag)
    * response header: ETag
    * request header: If-None-Match
  2. 比较修改时间
    * response header: Last-Modified
    * request header: If-Modified-Since

缓存相关文章:
* [Prevent unnecessary network requests with the HTTP Cache](https://web.dev/http-cache/)
