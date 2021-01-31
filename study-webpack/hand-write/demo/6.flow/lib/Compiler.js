const fs = require('fs');
const path = require('path');
// Why library require way is different?
// resolve: console import variable
const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const { SyncHook } = require('tapable');
const rootDir = process.cwd();

class Compiler { // 进行编译
  constructor (options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    };
    this.modules = {};
  }

  run () {
    this.hooks.run.call('RunPlugin');
    // 编译
    this.buildModule();
    this.hooks.done.call('DonePlugin');
  }

  // 依赖进行分析，通过ast对依赖进行处理
  buildModule () {
    const { entry, context } = this.options;
    const absEntry = path.join(context, entry);
    let originSource = fs.readFileSync(absEntry, 'utf-8');
    const dirname = path.dirname(absEntry);
    const { rules } = this.options.module;
    const moduleId = path.relative(rootDir, absEntry);
    const module = { id: moduleId, dependencies: [] };
    // 对匹配test正则的源代码执行对应的loader
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const { test, use } = rule;
      // 如果正则匹配了正在处理的文件，那么用loader对其源代码进行处理
      if (test.test(absEntry)) {
        originSource = this.exeLoaders(use, originSource);
      }
    }
    let ast = parser.parse(originSource, { sourceType: 'module' });
    // 遍历节点
    ast = traverse(ast, {
      CallExpression ({ node }) {
        if (node.callee?.name) {
          const modulePath = node.arguments[0].value;
          // 基于入口路径来拼接依赖模块的路径
          const depModulePath = path.join(dirname, modulePath);
          const depModuleId = path.relative(rootDir, depModulePath);
          // 将模块的引入路径进行替换，都要处理成相对于根目录的路径
          // https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-types
          node.arguments = [types.stringLiteral(depModuleId)];
          // 放到模块依赖中
          module.dependencies.push(depModulePath);
        }
      }
    });
    const finalSource = generator(ast);
    console.log('module', module);
  }

  exeLoaders (loaders, source) {
    // 倒着执行loader
    for (let i = loaders.length - 1; i >= 0; i--) {
      // 这里拿到的loaders是路径名，需要通过require将对应的代码导入
      const loader = require(loaders[i]);
      source = loader(source);
    }
    return source;
  }
}

module.exports = Compiler;
