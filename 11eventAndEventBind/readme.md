## 事件和事件绑定
> [event reference](https://developer.mozilla.org/zh-CN/docs/Web/Events)
### 什么是事件
浏览器赋予元素天生默认的一些行为，不论是否绑定相关的方法，只要进行相应的行为操作了，那么一定会触发相应的事件

### 事件绑定
给元素的某一个事件行为绑定方法，目的是行为触发可以做点自己想做的事

`DOM0`事件绑定
```javascript
element.onevent = function () {
  // doSomething
}

// 取消事件绑定
// 在绑定事件之前，其对应的属性值也是null
element.onevent = null // 将属性值指向空对象指针，取消对之前函数对应的引用
```
原理：给DOM元素的某一个私有事件属性赋值为函数。当用户触发这个事件行为,`js`引擎会帮助我们执行绑定的方法并传入事件对象(`element.onevent(event)`)。

根据`DOM0`事件绑定的原理，我们可以得到以下结论：
* 不是所有的事件类型都支持这种绑定方式，元素有`onxxx`属性时，才能给其绑定方法(例如：`DOMContentLoaded`事件就不支持这种绑定方案)
* 只能给当前元素的某一个事件行为绑定一个事件处理处理函数(在为对象的属性赋值为新函数的时候，会取消对之前函数地址的引用)


`DOM2`事件绑定：
```javascript
element.addEventListener(type, listener, useCapture)
element.removeEventListener(type, listener, useCapter)
```

原理：基于原型链查找机制，找到`EventTarget.prototype`上的`addEventListener`方法执行，它是基于浏览器事件池机制完成事件绑定的。
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200411194707.png)

### 事件对象

常用的事件

需要注意的是，每次事件触发时传递的事件对象都是相同的: 
```javascript
let object = null;
const box = document.getElementById('box');

box.onclick = function (event) {
  console.log('event', event);
  object = event;
};

box.addEventListener('click', function (event) {
  console.log('isEqual1', event === object); // true
});

document.addEventListener('click', function (event) {
  console.log('isEqual2', event === object); // true
});
```

### 事件传播机制

### 阻止浏览器默认行为
