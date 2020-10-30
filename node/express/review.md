## review
### basic implement
* Application: return get and listen method
* get: push path,handler,method to global array
* handle request: loop global array, then execute handler when path and method equivalent to req

### logic separate
* use express to createApplication
* use class Application store application code
* use router handle get and execute all stack array when request coming

### layer and route
* router will store per app.get information as a layer to stack(layer will own path,handler properties)
  * What effect of layer.route?
* route will store all callback of app.get as a layer to stack(layer will own method,handler properties)
* loop stack in router
  * layer in stack will called layer.handler that is called route.dispatch method
  * dispatch will loop all stack in route and recursive execute layer.handler that is callback of app.get
  * complete loop route stack, continue loop router stack
  * if all stack complete loop, default done will execute and back `can not get 'path'` response text 
