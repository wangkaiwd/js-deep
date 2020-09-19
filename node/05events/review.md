## review
* module find mechanism
  * third module
  * built-in module
* inherit
  * why need to inherit, but new EventEmitter directly ? 
  * Girl.prototype.__proto = EventEmitter.prototype
  * Girl.prototype = Object.create(EventEmitter.prototype) (Note: constructor property)
  * Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype) (equal to first way)
* implement myself EventEmitter
  * on
  * emit
  * off(cancel subscribe, emit not trigger listener that has been subscribed)
  * once(only trigger once: after first emit will off immediately)
    * wrapper once callback parameter to get a new named function, execute callback and off callback inside this wrapper function  and pass callback parameters
    * named function in order to execute off for it
    * how to cancel once subscribe? Add a property whose value is callback to record callback for named function.
  * newListener: trigger when before on method push callback to `_event`
    * trigger on listener immediately.
    * this involve event loop: process.nextTick and use once to subscribe listener
