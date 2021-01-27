const esprima = require('esprima');
const { traverse } = require('estraverse');
const codegen = require('escodegen');

const code = `
  const fn = function() {
    console.log(1)
  }
`;
const ast = esprima.parse(code);

traverse(ast, {
  enter (node) {
    if (node.type === 'FunctionExpression') {
      node.type = 'ArrowFunctionExpression';
    }
  }
});

const newCode = codegen.generate(ast);
console.log('newCode', newCode);
