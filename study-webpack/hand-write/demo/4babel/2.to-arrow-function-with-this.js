const core = require('@babel/core');
const types = require('@babel/types');
const code = `
  const fn = () => {
    console.log(1)
  }
`;

// 插件
// visitor: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
const TransformArrowFunctions = {
  visitor: {
    ArrowFunctionExpression (path) {
      const { node } = path;
      node.type = 'FunctionExpression';
    }
  }
};

// 生成语法树，遍历语法树，生成代码
// 转换语法树的功能教给插件来做
const result = core.transform(code, {
  plugins: [TransformArrowFunctions]
});
console.log(result.code);
