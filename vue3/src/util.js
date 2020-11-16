export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
];

// 不同的配置项有不同的合并策略
const strategies = {};
strategies.props = function () {};
strategies.methods = function () {};
strategies.data = function () {

};
strategies.computed = function () {};
strategies.watch = function () {};

function mergeHook (parentVal, childVal) {
  console.log('childVal', parentVal, childVal);
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
    options[key] = strategies[key](parent[key], child[key]);
  }

  return options;
}
