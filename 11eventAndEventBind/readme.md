## `JavaScript DOM` 事件
### 事件和事件绑定
> [event reference](https://developer.mozilla.org/zh-CN/docs/Web/Events)

事件：   
浏览器赋予元素天生默认的一些行为，不论是否绑定相关的方法，只要进行相应的行为操作了，那么一定会触发相应的事件

事件绑定：  
给元素的某一个事件行为绑定方法，目的是行为触发时可以做点自己想做的事

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
* 只能给当前元素的某一个事件行为绑定一个事件处理函数(在为对象的属性赋值为新函数的时候，会取消对之前函数地址的引用)


`DOM2`事件绑定：
```javascript
element.addEventListener(type, listener, useCapture)
element.removeEventListener(type, listener, useCapter)
```

原理：基于原型链查找机制，找到`EventTarget.prototype`上的`addEventListener`方法执行。

它的实现类似于发布订阅模式，会将对应事件的事件监听器函数放入一个数组中，在该事件触发时，将数组中的函数一次执行。所以这种事件绑定方式支持对**同一个事件绑定多个事件监听器**

### 事件对象
> [DOM event 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

浏览器会在事件执行时，为我们绑定的事件执行函数传入一个参数，该参数就是事件对象

事件对象的常用属性属性和方法：
* currentTarget: 绑定事件的元素
* eventPhase: 指示事件流正在处理哪个阶段
* target: 触发事件的元素
* type: 事件的类型(不区分大小写)
* preventDefault: 取消事件(阻止浏览器默认行为)
* stopPropagation: 停止事件冒泡

常用的事件对象有以下几种：  
* 鼠标事件对象：[MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)
* 键盘事件对象: [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)
* 触摸事件对象：[TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)
* 拖拽事件对象：[DragEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent)

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
> [Event dispatch and DOM event flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

![](https://www.w3.org/TR/uievents/images/eventflow.svg)

下面是一个关于事件冒泡和捕获的例子：
```javascript
// addEventListener进行事件监听可以控制事件传播阶段
// addEventListener的第三个参数可以控制支持冒泡(false)还是捕获(true),默认是支持冒泡(false)
window.addEventListener('click', function (e) {
  console.log('window');
});
document.documentElement.addEventListener('click', function (e) {
  console.log('html');
});
document.body.addEventListener('click', function (e) {
  console.log('body');
});
outer.addEventListener('click', function (e) {
  console.log('outer');
});
inner.addEventListener('click', function (e) {
  console.log('inner');
});
center.addEventListener('click', function (e) {
  console.log('center');
});

// center -> inner -> outer -> body -> window

window.addEventListener('click', function (e) {
  console.log('window');
}, true);
document.documentElement.addEventListener('click', function (e) {
  console.log('html');
}, true);
document.body.addEventListener('click', function (e) {
  console.log('body');
}, true);
outer.addEventListener('click', function (e) {
  console.log('outer');
}, true);
inner.addEventListener('click', function (e) {
  console.log('inner');
}, true);
center.addEventListener('click', function (e) {
  console.log('center');
}, true);

// window -> html -> body -> outer -> inner -> center
```
我们画图分析一下事件的传播机制：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/hhhh-2020-04-12-1644.png)

需要注意的是：
* 通过`onxxx`绑定的事件方法，只能在目标阶段和冒泡阶段执行
* 通过`addEventListener`绑定的事件方法，我们可以控制在捕获或冒泡阶段执行

事件传播分为三个阶段：
* 冒泡阶段(`bubble phase`): 事件对象逆向向上传播回目标元素的祖先元素，从父亲开始，最终到达`Window`
* 目标阶段(`target phase`): 事件对象已经抵达事件目标元素，为这个阶段注册的事件监听被调用
* 捕获阶段(`capture phase`): 事件正在被目标元素的祖先对象所处理，这个处理过程从`Window`开始，一直到目标元素的父元素

我们可以通过事件对象从`Event.prototype`原型上继承的`eventPhase`属性来判断当前事件所处的阶段：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200412155708.png)

### `mouseover`和`mouseenter`的本质区别
> `mouseout`和`mouseleave`同理

`mouseover`和`mouseenter`的区别有以下2点：
* `mouseover`支持事件冒泡，`mouseenter`不支持事件冒泡
* `mouseover`从子元素进入父元素的时候，会触发父元素的`mouseover`事件，而`mouseenter`并不会

我们通过一个例子来学习俩者的区别并理解事件传播过程：
```html
<body>
<select name="" id="select">
  <option value="over">mouseover</option>
  <option value="enter">mouseenter</option>
</select>
<div class="outer">
  <div class="inner">
  </div>
</div>
<script>
  const $ = (selector) => document.querySelector(selector);
  const outer = $('.outer'), inner = $('.inner'), select = $('#select');
  const elements = [outer, inner];
  const eventMap = { over: ['mouseover', 'mouseout'], enter: ['mouseenter', 'mouseleave'] };
  let type = 'over';
  const listener = function (e) {
    const className = e.currentTarget.className;
    console.log(`${className}-${e.type}`);
  };
  const bindListeners = function () {
    elements.map(item => {
      eventMap[type].map(event => {
        item.addEventListener(event, listener);
      });
    });
  };
  const removeListeners = function () {
    elements.map(item => {
      eventMap[type].map(event => {
        item.removeEventListener(event, listener);
      });
    });
  };
  bindListeners();
  select.addEventListener('change', function (e) {
    removeListeners();
    type = e.target.value;
    bindListeners();
  });
</script>
</body>
```
这里是在线例子:[mouseover-mouseenter-differ](https://stackblitz.com/edit/mouseover-mouseenter-differ)

我们分析一下从最左侧划入最右侧，俩个事件的触发过程

`mouseover`:
* 鼠标移入`outer`元素，触发`outer`的`mouseover`事件
* 鼠标从`outer`移入`inner`时，首先触发`outer`的`mouseout`事件。之后移入`inner`，触发`inner`的`mouseover`事件，由于事件冒泡机制，触发`outer`的`mouseover`事件
* 鼠标移出`inner`时，首先触发`inner`的`mouseout`事件，由于冒泡机制，会触发`outer`的`mouseout`事件。之后移入`outer`触发`outer`的`mouseover`事件
* 鼠标移出`outer`，触发`outer`的`mouseout`事件

打印结果如下：
```javascript
// 鼠标移入outer
// outer-mouseover

// 鼠标从outer移入inner
// outer-mouseout -> inner-mouseover -> outer-mouseover

// 鼠标从inner移入outer
// inner-mouseout -> outer-mouseout -> outer-mouseover

// 鼠标移出outer
// outer-mouseout 
```

`mouseenter`:
* 鼠标进入`outer`，触发`outer`的`mouseenter`事件
* 鼠标从`outer`离开进入`inner`，触发`inner`的`mouseenter`事件，此事件不会冒泡
* 鼠标从`inner`离开进入`outer`，触发`inner`的`mouseleave`事件，此事件不会冒泡
* 鼠标从`outer`离开，触发`outer`的`mouseleave`事件

打印结果如下：
```javascript
// 鼠标进入outer
// outer-mouseenter

// 鼠标从outer进入inner
// inner-mouseenter

// 鼠标从inner进入outer
// inner-mouseleave

// 鼠标离开outer
// outer-mouseleave
```

### 阻止浏览器默认行为
> [Browser default actions](https://javascript.info/default-browser-action)

在`JavaScript`中，许多事件将会自动导致浏览器执行特定的行为，比如：
* 点击`a`链接
* 点击`form`提交按钮
* 在文本上按下鼠标按钮并且移动鼠标选择文本
* 在页面中右键鼠标出现选项菜单

这里我们先看一下`a`标签的例子，`a`标签的默认行为：
* 跳转页面
* 锚点定位

阻止`a`标签的默认行为：
```html
<a href="javascript:;">跳转</a>
```

也可以为`a`标签绑定点击事件，在点击事件中阻止默认行为： 
```javascript
const aLink = document.getElementById('a');
aLink.onclick = function(e) {
  // return false
  e.preventDefault();
} 
```

`input`输入框能输入内容也是浏览器的一种默认行为，我们限制用户最多只能输入18位：
```html
<body>
<input class="input" type="text">
<script>
  const input = document.getElementsByClassName('input')[0];
  input.addEventListener('keydown', function (e) {
    // const value = e.target.value;
    // const value = this.value
    const whiteList = [13, 8, 37, 38, 39, 40];
    if (this.value.length >= 10 && !whiteList.includes(e.keyCode)) {
      e.preventDefault();
    }
  });
</script>
</body>
```
> 这里只是为了学习对应的知识点而模拟的场景，实际上我们可以使用原生的`maxLength`属性

上边的代码在`input`中输入的内容长度超过10位后，将阻止浏览器的默认行为，导致`input`无法输入。

但是我们的`input`框在此时应该还可以进行移动光标、通过`enter`键提交、通过`backspace`键删除内容，我们通过其对应的`keyCode`值来进行过滤。

当然，浏览器中的默认行为还有很多,这里我们只是列举了一些而已，当大家遇到的时候都可以使用上边提到的方法阻止其默认行为
