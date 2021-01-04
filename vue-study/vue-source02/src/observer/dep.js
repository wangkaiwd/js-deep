let id = 0;

class Dep {
  constructor () {
    this.id = id++;
    this.subs = [];
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  /**
   * 要通过watcher来记录dep
   */
  depend () {
    Dep.target.addDep(this);
  }

  notify () {
    this.subs.forEach(sub => sub.update());
  }
}

/**
 * Dep.target: 用来记录当前正在执行的watcher
 *
 * stack: 记录当前所有在处理的watcher，保持了watcher的调用记录
 */
Dep.target = null;
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
