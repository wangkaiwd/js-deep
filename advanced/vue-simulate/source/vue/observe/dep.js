let id = 0;

class Dep {
  constructor () {
    this.id = ++id;
    this.subs = [];
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  notify () {
    this.subs.forEach(sub => sub.update());
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

// 用来保存当前watcher
const stack = [];

export function pushTarget (watcher) {
  stack.push(watcher);
  Dep.target = watcher;
}

export function popTarget (watcher) {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
