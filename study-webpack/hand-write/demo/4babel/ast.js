const esprima = require('esprima');
const { traverse } = require('estraverse');
const codegen = require('escodegen');

const code = `
  const fn = function() {
    console.log(1)
  }
`;
const ast = esprima.parse(code);

function demo1 () {
  let indent = 0;
// 只遍历有type的属性？
// traverse ast
  const padLeft = () => '--'.repeat(indent);
  traverse(ast, {
    enter (node, parent) {
      indent += 2;
      console.log(padLeft() + node.type);
    },
    leave (node, parent) {
      console.log(padLeft() + node.type);
      indent -= 2;
    }
  });
  const newCode = codegen.generate(ast);
  console.log(newCode);
}

// 使用traverse遍历ast语法树
// demo1();

function demo2 () {
  traverse(ast, {
    enter (node) {
      if (node.type === 'FunctionDeclaration') {
        node.id.name = 'new' + node.id.name;
      }
    }
  });
  const newCode = codegen.generate(ast);
  console.log('newCode', newCode);
}

demo2();


