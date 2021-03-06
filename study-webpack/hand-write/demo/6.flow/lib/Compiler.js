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

function getSource (chunk) {
  // 用每个chunk的module来生成模块
  const modulesStr = chunk.modules.map(module => {
    return `'${module.id}':(module,exports,require) => {
        ${module.source}
      }`;
  }).join(',');
  return `
    (() => {
      const modules = {
        ${modulesStr}
      };
      const cache = {};
    
      function require (moduleId) {
        const cacheModule = cache[moduleId]
        if(cacheModule) { return cacheModule }
        const module = cache[moduleId] = { exports: {} };
        modules[moduleId].call(module, module, module.exports, require);
        return module.exports;
      }
      
      (() => {
        ${chunk.entryModule.source}
      })();
    })()
  `;
}

class Compiler { // 进行编译
  constructor (options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    };
    this.modules = [];
    this.chunks = [];
    this.assets = {}; // key: 文件名，值是打包后的内容
    this.files = []; // 文件名数组
    this.entries = [];
  }

  run () {
    this.hooks.run.call('RunPlugin');
    // 编译
    const { entry, context, output } = this.options;
    let entries = {};
    if (typeof entry === 'string') { // 单入口文件
      entries.main = entry;
    } else {
      entries = entry; // {page1:xxx,page:xxx}
    }
    for (const entryName in entries) { // 分别打包每一个入口
      const absEntry = path.join(context, entries[entryName]);
      const entryModule = this.buildModule(entryName, absEntry);
      const modules = this.modules.filter(module => module.name === entryName);
      const chunk = { name: entryName, entryModule, modules };
      this.entries.push(chunk);
      this.chunks.push(chunk);
    }
    this.chunks.forEach(chunk => {
      this.assets[chunk.name] = getSource(chunk); // source
    });
    this.files = Object.keys(this.assets);
    // todo:
    //  1. recursive dependence: later resolve
    for (const file in this.assets) {
      if (this.assets.hasOwnProperty(file)) {
        const outputPath = path.join(output.path, output.filename.replace('[name]', file));
        fs.writeFileSync(outputPath, this.assets[file]);
      }
    }
    // 将资源输出到对应的目录
    this.hooks.done.call('DonePlugin');
  }

  // 依赖进行分析，通过ast对依赖进行处理
  buildModule (name, modulePath) {
    let originSource = fs.readFileSync(modulePath, 'utf-8');
    const dirname = path.dirname(modulePath);
    const moduleId = path.relative(rootDir, modulePath);
    const module = { id: moduleId, name, dependencies: [] };
    // 将源代码用loader进行处理
    originSource = this.handleRules(originSource, modulePath);
    // 通过源代码转换ast语法树
    const ast = this.transformAST(module, originSource, dirname);
    module.source = generator(ast).code;
    // 构建module对象
    this.modules.push(module);
    // 继续处理依赖的模块
    this.buildDepModules(module);
    return module;
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
    const { dependencies, name } = module;
    if (dependencies && Array.isArray(dependencies)) {
      dependencies.forEach(dep => {
        this.buildModule(name, dep);
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
