## handwrite simple vuex

write vuex step by step

### Problem

* why actions only store async logic
* how to implement actions by Promise

### What is vuex

Vuex is a global object in Vue application. Different from normal object of JavaScript, data in it is reactive.

Do a simple demo with vuex.

### Feature

will implement following features:

```javascript
const store = new Vuex.store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

* state
* getters
* mutations
* actions
  * _withCommit: check whether async call or not(enable the strict mode)
* modules
* namespace
* dynamic register module
* plugin
  * implement logger official plugin
* replaceState
* helper
