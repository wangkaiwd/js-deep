let id = 0;

/**
 * 通过data中对应属性的get方法搜集watcher
 * 在之后更新视图时，通知收集的watcher执行update来更新视图
 */
class Dep {
  constructor () {
    this.subs = [];
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify () {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

// todo:如果将这里的逻辑放到Dep类内部实现会怎么样？
const stack = [];

export function pushTarget (watcher) {
  stack.push(watcher);
  Dep.target = watcher;
}

export function popTarget () {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
