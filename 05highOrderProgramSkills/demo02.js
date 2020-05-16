// dom2事件绑定兼容性处理为例

/**
 * 存在的问题：第一次执行后已经知道了是哪种情况(浏览器环境)
 */
// function emit (element, event, fn) {
//   if (element.addEventListener) {
//     element.addEventListener(event, fn);
//   } else if (element.attachEvent) {
//     element.attachEvent(event, fn);
//   } else {
//     element[`on${event}`] = fn;
//   }
// }

// 这样在执行后就会只执行满足当前环境的代码：
// js惰性函数：执行一次if分支后，接下来就不会再执行if分支，提升性能
function emit (element, event, fn) {
  if (element.addEventListener) {
    emit = function (element, event, fn) {
      element.addEventListener(event, fn);
    };
  } else if (element.attachEvent) {
    emit = function (element, event, fn) {
      element.attachEvent(event, fn);
    };
  } else {
    emit = function (element, event, fn) {
      element[`on${event}`] = fn;
    };
  }
  emit(element, event, fn);
}

const $button = document.getElementById('button');
emit($button, 'click', () => {
  console.log('fn1');
});
emit($button, 'click', () => {
  console.log('fn2');
});
