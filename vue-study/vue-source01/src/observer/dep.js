let id = 0;

class Dep {
  constructor () {
    this.id = id++;
    this.subs = [];
  }

  depend () {
    Dep.target.addDep(this);
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  notify () {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

export default Dep;

Dep.target = null;

const stack = [];

export function pushTarget (watcher) {
  stack.push(watcher);
  Dep.target = watcher;
}

export function popTarget () {
  Dep.target = stack.pop();
}
