export function proxy (target, key, source) {
  // 取值和设置值时会触发source中对应属性的set/get方法
  Object.defineProperty(target, key, {
    get () {
      return source[key];
    },
    set (value) {
      source[key] = value;
    }
  });
}

export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

export function defineProperty (target, key, value) {
  Object.defineProperty(target, key, {
    configurable: false,
    enumerable: false,
    value
  });
}

export function noop () {}

function makeMap (str) {
  const array = str.split(',');
  const map = array.reduce((memo, current) => {
    memo[current] = true;
    return memo;
  }, {});
  return function (key) {
    return map[key];
  };
}

export const isReservedTag = makeMap('div,a,p,button,span,img');
