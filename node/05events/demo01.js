// 核心模块 events: 默认先看是不是核心模块
// 第三方模块(package.json)
// 如果当前目录下没有node_modules，会向上级查找，一直会找到根目录，如果还找不到，会报错
// node_modules 下的同名文件夹下的index.js
// console.log(module.paths);
// [
//   '/Users/wangkai/workSpace/personalCode/study01/jsBase/js-deep/node/04events/node_modules',
//   '/Users/wangkai/workSpace/personalCode/study01/jsBase/js-deep/node/node_modules',
//   '/Users/wangkai/workSpace/personalCode/study01/jsBase/js-deep/node_modules',
//   '/Users/wangkai/workSpace/personalCode/study01/jsBase/node_modules',
//   '/Users/wangkai/workSpace/personalCode/study01/node_modules',
//   '/Users/wangkai/workSpace/personalCode/node_modules',
//   '/Users/wangkai/workSpace/node_modules',
//   '/Users/wangkai/node_modules',
//   '/Users/node_modules',
//   '/node_modules'
// ]
const EventEmitter = require('events');

// const util = require('util');

function Girl () {

}

// util.inherits(Girl, EventEmitter);
Girl.prototype = Object.create(EventEmitter.prototype);
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype);
// Object.setPrototypeOf(Girl, EventEmitter.prototype) why not work?
const girl = new Girl();
girl.on('newListener', (eventName, listener) => {
  console.log('event', eventName, listener);
});

function say (what) {
  console.log('say ' + what);
}

function eat (what) {
  console.log('eat ' + what);
}

girl.on('say', say);

girl.on('say', eat);
// girl.off('say', eat);
girl.emit('say', 'me');
// 再次emit不会触发：$once
// girl.emit('say', 'you');
