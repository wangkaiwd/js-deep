const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;
const utils = {
  getValue (vm, expr) {
    // expr: person.name
    const keys = expr.split('.');
    // [person,name]
    return keys.reduce((memo, cur) => {
      return memo[cur];
    }, vm);
  },
  compileText (vm, node) {
    node.textContent = node.textContent.replace(reg, function (...args) {
      return utils.getValue(vm, args[1]);
    });
  }
};
export default utils;
