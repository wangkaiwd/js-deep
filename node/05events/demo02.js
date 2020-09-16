const EventEmitter = require('./events');
const e = new EventEmitter();

// 需求：在事件一被监听后就触发
e.on('newListener', (eventName, listener) => {
  // The EventEmitter instance will emit its own newListener event before a listener is added to tis internal array of listeners
  // e.emit(eventName);
  // console.log('bind');
  process.nextTick(() => {
    // 等到该方法执行的时候，数组中已经通过on方法添加了sleep对应的所有callback
    // 会放到任务队列中
    e.emit(eventName);
  });
});

// 再次emit不会触发
e.once('sleep', () => {
  console.log('sleep1');
});

e.once('sleep', () => {
  console.log('sleep2');
});

e.once('sleep', () => {
  console.log('sleep3');
});

e.once('sleep', () => {
  console.log('sleep4');
});



