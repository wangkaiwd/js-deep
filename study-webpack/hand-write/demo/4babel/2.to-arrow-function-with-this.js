const core = require('@babel/core');
const types = require('@babel/types');
const code = `
  const fn = function() {
    console.log(1)
  }
`;

//

// 生成语法树，遍历语法树，生成代码
// 转换语法树的功能教给插件来做
core.transform(code, {
  plugins: []
});
