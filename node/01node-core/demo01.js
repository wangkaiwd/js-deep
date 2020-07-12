// console.log(process);
// console.log('platform', process.platform); // Node.js 进程运行的操作系统平台

// process.argv属性返回一个数组，这个数组包含Node.js进程运行时传入的命令行参数
// 第一个数组元素：启动Node.js进程的可执行的绝对路径名 process.execPath
// 第二个数组元素：被执行JavaScript文件的路径
// 剩余的参数是任何命令行额外的参数
// console.log('argv', process.argv);
// 解析命令行参数： node demo01.js --port 3000 --config xxx
// 将命令行参数处理为： {port:3000, config: xxx}
// 一般使用commander来解析命令行参数

// Node.js进程运行的当前工作目录
// http-server 会利用该api在当前工作目录下搭建静态服务器
// console.log('current work directory', process.cwd());

// 包含用户环境的变量
// cross-env 跨平台设置环境脚本
// console.log('env', process.env);
// 在当前命令行窗口下设置环境变量：window set; mac export

