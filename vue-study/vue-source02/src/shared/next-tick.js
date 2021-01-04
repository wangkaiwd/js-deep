let callbacks = [];
let pending = false;
let timerFunc = undefined;

function flushCallbacks () {
  // 在遍历过程中,length是可能发生变化的
  for (let i = 0; i < callbacks.length; i++) {
    const cb = callbacks[i];
    cb();
  }
  callbacks = [];
  pending = false;
}

if (Promise) {
  timerFunc = function () {
    Promise.resolve().then(flushCallbacks);
  };
} else if (MutationObserver) {
  const textNode = document.createTextNode('1');
  const observer = new MutationObserver(() => {
    flushCallbacks();
    observer.disconnect();
  });
  observer.observe(textNode, { characterData: true });
  textNode.textContent = '2';
} else if (setImmediate) {
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function () {setTimeout(flushCallbacks);};
}

function nextTick (cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    timerFunc();
  }
}

export default nextTick;
