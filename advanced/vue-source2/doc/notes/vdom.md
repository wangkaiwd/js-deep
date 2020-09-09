## 虚拟`DOM`
* 通过对象来递归生成`dom`节点
* 通过虚拟节点来生成真实节点

### 比对优化
优化：开始节点、开始索引、结尾节点、结尾索引移动比对

* 结尾插入
* 开头插入：如何将剩余内容插入到老元素开头？(如何找到`insertBefore`的参考元素)

面试题：用索引作为`key`  
* [示意图](https://excalidraw.com/#json=5860182202515456,wl2z4AWFpXmiJ1ndxo0f3w)
* 不管如何移动都会导致节点的`key`相同，但是节点的内容不同，还会再次进行`diff`，导致元素不能复用
* **还需要实践**  

### 知识点
* [parent.insertBefore(newNode,referenceNode)](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore): 如果`referenceNode`是`null`，相当于在`parent`的末尾插入，即`parent.appendChild(newNode)`
