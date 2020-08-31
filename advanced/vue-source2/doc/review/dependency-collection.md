## dependency collection
1. create `Dep class` to collection update property `watcher`
2. collection `watcher` in property get method
3. notify update `watcher.update` in property set method
4. record dep who add current `wacher` to subscribes in `watcher`，and filter repeat dep
5. continue `watcher` for dep after add dep for `watcher`  
