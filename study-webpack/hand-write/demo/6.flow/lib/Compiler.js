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
    this.modules = [];
  }

  run () {
    this.hooks.run.call('RunPlugin');
    // 编译
    const { entry, context } = this.options;
    const absEntry = path.join(context, entry);
    this.buildModule(absEntry);
    console.log('modules', this.modules);
    this.hooks.done.call('DonePlugin');
  }

  // 依赖进行分析，通过ast对依赖进行处理
  buildModule (modulePath) {
    let originSource = fs.readFileSync(modulePath, 'utf-8');
    const dirname = path.dirname(modulePath);
    const moduleId = path.relative(rootDir, modulePath);
    const module = { id: moduleId, dependencies: [] };
    // 将源代码用loader进行处理
    originSource = this.handleRules(originSource, modulePath);
    // 通过源代码转换ast语法树
    const ast = this.transformAST(module, originSource, dirname);
    // 构建module对象
    module.source = generator(ast).code;
    this.modules.push(module);
    // 继续处理依赖的模块
    this.buildDepModules(module);
  }

  handleRules (source, modulePath) {
    const { rules } = this.options.module;
    // 对匹配test正则的源代码执行对应的loader
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const { test, use } = rule;
      // 如果正则匹配了正在处理的文件，那么用loader对其源代码进行处理
      if (test.test(modulePath)) {
        source = this.exeLoaders(use, source);
      }
    }
    return source;
  }

  transformAST (module, source, dirname) {
    let ast = parser.parse(source, { sourceType: 'module' });
    // 遍历节点
    traverse(ast, {
      CallExpression ({ node }) {
        if (node.callee?.name === 'require') {
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
    return ast;
  }

  buildDepModules (module) {
    const { dependencies } = module;
    if (dependencies && Array.isArray(dependencies)) {
      dependencies.forEach(dep => {
        this.buildModule(dep);
      });
    }
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
