var x = 3, obj = { x: 5 };
obj.fn = (function () {
  this.x *= ++x;
  return function (y) {
    this.x *= (++x) + y;
    console.log(x);
  };
})();
