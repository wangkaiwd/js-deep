## vue-router
* create VueRouter class
* VueRouter.install method
* bind _routerRoot and _router for all Vue component
* new VueRoute
  * format routes in options that user passed in
  * return matcher by createMatcher which include addRoutes and match method
* create history relevant file
  * base: parent class, put common method and property
  * hash: hash history mode for vue router

core logic:
* format routes config to make between path and route record map
* listen hashchange event, match current route record after hash change
* route has a important property matched can implement nest route
  * matched property is used to match the deep of router-view component to render different level component
* add $route and $router for Vue.prototype
