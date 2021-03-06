export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
];

// 不同的配置项有不同的合并策略
const strategies = {};
// strategies.props = function () {};
// strategies.methods = function () {};
// temporary strategy function
// strategies.data = function (parentVal, childVal) {
// };
// strategies.computed = function () {};
// strategies.watch = function () {};
strategies.components = function (parentVal, childVal) {
  const result = Object.create(parentVal);
  if (childVal) {
    for (const key in childVal) {
      if (childVal.hasOwnProperty(key)) {
        result[key] = childVal[key];
      }
    }
  }
  return result;
};

function mergeHook (parentVal, childVal) {
  if (parentVal) {
    if (childVal) {
      // why childVal is an array ?
      // childVal may an array or function, concat parameter can simple data type
      // and push will return length of new array
      return parentVal.concat(childVal);
    }
    return parentVal;
  }
  return [childVal];
}

// 先实现钩子函数
LIFECYCLE_HOOKS.forEach(hook => {
  strategies[hook] = mergeHook;
});

export function mergeOptions (parent, child) {
  const options = {};
  // 1. 父亲中有的，儿子没有
  // 2. 父亲中有，儿子也有
  // 3. 父亲没有，儿子有
  // 具体的合并细节，需要根据key不同来进行不同的处理
  for (const key in parent) { // 父亲中有的，儿子中也可能有
    if (parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }
  for (const key in child) { // 儿子中有，父亲中没有的
    if (child.hasOwnProperty(key) && !parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  function mergeField (key) {
    if (strategies[key]) {
      options[key] = strategies[key](parent[key], child[key]);
    } else {
      if (child[key]) {
        options[key] = child[key];
      } else {
        options[key] = parent[key];
      }
    }
  }

  return options;
}

let timerFunc = undefined;
let callbacks = [];
let pending = false;
if (Promise) {
  timerFunc = function () {Promise.resolve().then(flushCallbacks);};
} else if (MutationObserver) {
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode('1');
  observer.observe(textNode, { characterData: true });
  timerFunc = function () {
    textNode.textContent = '2';
  };
} else if (setImmediate) {
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function () {
    setTimeout(flushCallbacks);
  };
}

function flushCallbacks () {
  // change exist arr when forEach loop which not affect loop count
  // 这里使用forEach时，在新添加内容后将不会遍历数组中新增的内容
  for (let i = 0; i < callbacks.length; i++) {
    const cb = callbacks[i];
    cb();
  }
  callbacks = [];
  pending = false;
}

export function nextTick (cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    timerFunc();
  }
}

function makeMap (str) {
  const list = str.split(',');
  const map = list.reduce((obj, cur) => {
    obj[cur] = true;
    return obj;
  }, {});
  return function (key) {
    return map[key];
  };
}

//
export const isReservedTag = makeMap(
  `div,a,h2,span,img,p,button,input,ul,li` // 这里并不全，详细标签可以到Vue源码中查看，或者尝试自己查找
);
