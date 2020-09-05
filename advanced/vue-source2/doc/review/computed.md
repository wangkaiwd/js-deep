## Computed
1. pass computed object for vue instance
2. new lazy watcher, dirty = true, key => key of computed, exprOrFn => value of computed
3. proxy key of computed for vm 
4. do nothing when init computed except for pass parameter to new watcher
5. trigger getter of computed key when render view
6. Dep.target = render watcher, watcher execute evaluate method
7. evaluate method will get computed key value, so vue will trigger dependency property respectively
8. dependency property's getter will execute and collection computed watcher by Dep of itself
9. dirty = false
10. computed watcher pop stack, left render watcher
11. If has Dep.target yet, computed watcher will get it's deps and collection Dep.target for deps
12. Note, currently Dep.target = render watcher, so we collect render watcher for dependency property of computed key
13. set new value for dependency property will get latest value of computed then render view
