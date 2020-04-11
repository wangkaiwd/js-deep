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
