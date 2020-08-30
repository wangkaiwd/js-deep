const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;
const utils = {
  getValue (vm, expr) {
    // expr: person.name
    const keys = expr.split('.');
    // [person,name]
    // 如果不使用reduce实现
    // let result = vm;
    // keys.forEach(key => {
    //   result = vm[key];
    // });
    // return result;
    // reduce会产生单个输出值
    return keys.reduce((memo, cur) => {
      return memo[cur];
    }, vm);
  },
  compileText (vm, node) {
    if (!node.originText) {
      node.originText = node.textContent;
    }
    node.textContent = node.originText.replace(reg, function (...args) {
      return utils.getValue(vm, args[1]);
    });
  }
};
export default utils;
