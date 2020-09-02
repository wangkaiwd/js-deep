## dependency collection array
* create specially dep for array
* notify dep to call watcher to update view on custom array prototype
* If observe method return a value, use `value.__ob__.dep` to collection dependence
* nest array need to call dependArray method recursively   

