const strategies = {};
const LIFECYCLE_HOOK = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
];

function defaultStrategy (parentVal, childVal) {
  return parentVal ? parentVal : childVal;
}

function mergeHook (parentVal, childVal) {
  if (parentVal) {
    if (childVal) {
      return parentVal.concat(childVal);
    }
    return parentVal;
  } else { // 有对应的生命周期选项才会进行合并，没有传入的话不会到对应的合并策略
    return [childVal];
  }
}

function mergeComponents (parentVal, childVal) {
  const result = Object.create(parentVal);
  for (const key in childVal) {
    if (childVal.hasOwnProperty(key)) {
      result[key] = childVal[key];
    }
  }
  return result;
}

strategies.components = mergeComponents;
LIFECYCLE_HOOK.forEach(hook => {
  strategies[hook] = mergeHook;
});

export function mergeOptions (parent, child) {
  const options = {};

  function mergeField (key) {
    // 没有对应的策略就会执行默认策略
    const strategy = strategies[key] || defaultStrategy;
    options[key] = strategy(parent[key], child[key]);
  }

  for (const key in parent) {
    if (parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }
  for (const key in child) {
    if (child.hasOwnProperty(key) && !parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }
  return options;
}
