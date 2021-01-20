import { forEach } from './my-vuex';

class ModuleCollection {
  constructor (options) {
    this.register([], options);
  }

  // path用来递归获取_children的值
  // {  state: {},
  //    mutations: {},
  //    modules: {
  //      a:{state:xx,mutations:xxx,actions:xxx},
  //      b:{
  //        state:xx,mutations:xxx,actions:xxx,
  //        modules: {
  //          c: {state:xx,mutations:xxx,actions:xxx}
  //        }
  //      },
  //    }
  //  }
  // {
  //    _raw: {state:xx,mutations:xxx,actions:xxx},
  //    _children: {
  //      a: {},
  //      b: {
  //        _raw:
  //        _children: {
  //          c: {
  //            _raw: {}
  //          }
  //        }
  //      },
  //    },
  //    state: {}
  // }

  /**
   * 核心：多传递一个path参数来记录需要操作的内容的位置
   *
   * 递归遍历所有的store中的配置项(config options),
   * 格式化为{_raw: module,_children: module.modules,state: module.state}的格式
   * @param path 记录遍历过程中每一次遍历_children时，key组成的数组。最终可以根据该数组为this.root进行赋值
   * @param originModule 需要注册的module
   */
  register (path, originModule) {
    const rawModule = {
      _raw: originModule,
      _children: {},
      state: originModule.state
    };
    rawModule.rawModule = rawModule;
    if (!this.root) {
      this.root = rawModule;
    } else {
      // [b,c,d]
      // const lastKey = path[path.length - 1];
      // 当层级比教深的时候需要递归去寻找
      // this.root._children[lastKey] = rawModule;
      // let current = this.root; // 全局变量来一直保存修改后的值
      // path.forEach(key => {
      //   这样直接赋值会出问题
      // if (current._children[key]) {
      //   current = current._children[key];
      // } else {
      //   current = current._children[key] = rawModule;
      // }
      // });
      const parent = this.get(path.slice(0, -1));
      const lastKey = path[path.length - 1];
      parent._children[lastKey] = rawModule;
    }
    if (originModule.modules) {
      // this.register(path, rootModule.modules);
      forEach(originModule.modules, (key, value) => {
        this.register(path.concat(key), value);
      });
    }
  }

  get (path) {
    return path.reduce((module, key) => {
      return module._children[key];
    }, this.root);
  }
}

export default ModuleCollection;
