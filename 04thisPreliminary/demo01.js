var x = 10; // window.x => 10 , 注意：let , const 不会将变量挂载到window中
const obj = {
  x: 20,
  fn () {
    console.log(this.x);
  },
};

const fn = obj.fn;

// 假设页面中有id为box的dom元素
const $box = document.getElementById('box');
$box.x = 30;

fn(); // 10

obj.fn(); // 20

$box.addEventListener('click', function () {
  obj.fn(); // 20
});

$box.addEventListener('click', obj.fn); // 30
