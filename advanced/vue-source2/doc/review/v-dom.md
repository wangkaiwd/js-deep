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
  
### optimize strategy
overview: make use of head and tail pointer, then compare and move them successively

1. insert at the end of old element
2. insert at the beginning of old element
3. reverse old element
4. flash back
