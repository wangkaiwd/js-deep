const EventEmitter = require('events');
const e = new EventEmitter();

// 需求：在事件一被监听后就触发
e.on('newListener', (eventName, listener) => {
  // The EventEmitter instance will emit its own newListener event before a listener is added to tis internal array of listeners
  // e.emit(eventName);
});

e.on('sleep', () => {
  console.log('sleep1');
});

e.on('sleep', () => {
  console.log('sleep2');
});

e.on('sleep', () => {
  console.log('sleep3');
});

e.on('sleep', () => {
  console.log('sleep4');
});



