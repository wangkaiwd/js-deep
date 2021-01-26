const esprima = require('esprima');
const traverse = require('estraverse');
const codegen = require('escodegen');

const code = `
  function fn() {
    console.log(1)
  }
`;
const ast = esprima.parse(code);
console.log('ast', ast);
