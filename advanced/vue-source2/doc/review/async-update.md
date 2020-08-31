## async update
* put update watcher to queue
* remove repeat watcher then async execute update method
* precedence of async method:
  1. Promise
  2. MutationObserver
  3. setImmediate
  4. setTimeout
