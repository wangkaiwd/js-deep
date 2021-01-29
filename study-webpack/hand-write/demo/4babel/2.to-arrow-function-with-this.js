const core = require('@babel/core');
const types = require('@babel/types');
const code = `
  const fn = (a,b) => {
    console.log(this)
    return a+b
  }
`;

function getScopeInformation (path) {
  const thisPaths = [];
  path.traverse({
    ThisExpression (expression) {
      thisPaths.push(expression);
    }
  });
  return thisPaths;
}

// 插件
function hoistFunctionEnvironment (path) {
  const thisEnvFn = path.findParent(p => {
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram();
  });

  // 查找哪些地方用到了this
  const thisBinding = '_this';
  const thisPaths = getScopeInformation(path);
  if (thisPaths.length > 0) {
    thisEnvFn.scope.push({
      id: types.identifier(thisBinding),
      init: types.thisExpression()
    });
  }
  // 将所有this替换为_this
  thisPaths.forEach(thisChild => {
    const thisRef = types.identifier(thisBinding);
    thisChild.replaceWith(thisRef);
  });
}

// visitor: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-visitors
const TransformArrowFunctions = {
  visitor: {
    ArrowFunctionExpression (path) {
      const { node } = path;
      node.type = 'FunctionExpression';
      hoistFunctionEnvironment(path);
    }
  }
};

// 生成语法树，遍历语法树，生成代码
// 转换语法树的功能教给插件来做
const result = core.transform(code, {
  plugins: [TransformArrowFunctions]
});
console.log(result.code);
