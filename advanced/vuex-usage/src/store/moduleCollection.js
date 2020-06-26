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
  register (path, rootModule) {
    const rawModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    };
    if (!this.root) {
      this.root = rawModule;
    } else {
      // [b,c,d]
      // const lastKey = path[path.length - 1];
      // 当层级比教深的时候需要递归去寻找
      // this.root._children[lastKey] = rawModule;
      let current = this.root; // 全局变量来一直保存修改后的值
      path.forEach(key => {
        // 这样直接赋值会出问题
        if (current._children[key]) {
          current = current._children[key];
        } else {
          current = current._children[key] = rawModule;
        }
      });
    }
    if (rootModule.modules) {
      // this.register(path, rootModule.modules);
      forEach(rootModule.modules, (key, value) => {
        this.register(path.concat(key), value);
      });
    }
  }
}

export default ModuleCollection;
