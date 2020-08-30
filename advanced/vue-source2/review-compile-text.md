### compile text
1. if el exist in options, execute $mount method
2. process el option, make it convert to actual dom and assign its value to vm.$el
3. create updateComponent method, call _update method inside it
4. create empty document fragment, then recursively move all dom element to fragment
5. use property value in vm to replace dom string that inside double brackets, then move into actual dom

