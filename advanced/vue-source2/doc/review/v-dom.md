## virtual dom
* create virtual dom by javascript plain object
* update properties
  * delete property if no exist in new node
  * handle style separately
  * iterate new props and set each property for vnode.el
* compare children
  * has old children and new children: diff algorithm
  * has old children but no new children: `el.innerHTML = '''`
  * has new children but no old children: `el.replaceChildWith(newEl)`
  
