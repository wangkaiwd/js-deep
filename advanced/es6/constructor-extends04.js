function _typeof (obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj; }; } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; }
  return _typeof(obj);
}

// B extends A
// subClass: B, superClass: A
function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function'); }
  // B.prototype = Object.create(superClass.prototype,{
  //    value: B,
  //    writable: true,
  //    configurable: true
  // })
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  // subClass.__proto__ = superClass
  // B.__proto = A 继承了静态方法
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf (o, p) {
  // 通过惰性函数，将函数进行重新赋值
  // 下次调用时直接执行重新赋值的函数，而不用再进行判断函数Object.setPrototypeOf是否存在
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _createSuper (Derived) { // B
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal () {
    // B 从A中继承了静态方法
    // Super  = B.__proto__ = A
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      // A.apply(b, {length:0}) => A.call(b, ...arguments)
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

// call: A的返回值，如果A返回了一个对象，那么会返回该对象作为子类的this，然后返回
function _possibleConstructorReturn (self, call) { // b undefined
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call; }
  return _assertThisInitialized(self);
}

function _assertThisInitialized (self) {
  if (self === void 0) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); }
  return self;
}

function _isNativeReflectConstruct () {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) { return false; }
}

function _getPrototypeOf (o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf (o) { return o.__proto__ || Object.getPrototypeOf(o); };
  return _getPrototypeOf(o);
}

function _instanceof (left, right) { if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck (instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties (target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false; // 不可枚举
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass (Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var A = /*#__PURE__*/function () {
  function A () {
    _classCallCheck(this, A);

    this.a = 100;
  }

  _createClass(A, [{
    key: 'getA',
    value: function getA () {
      console.log(this.a);
    }
  }]);

  return A;
}();

var B = /*#__PURE__*/function (_A) {
  // 继承原型方法以及静态方法:
  //  1. 继承原型方法： Object.create()
  //  2. 继承静态方法： Object.setPrototypeOf()
  _inherits(B, _A);

  var _super = _createSuper(B);

  function B () {
    var _this;

    _classCallCheck(this, B);

    // 继承私有方法
    //  A.apply(this,arguments)
    _this = _super.call(this);
    _this.b = 200;
    return _this;
  }

  //
  _createClass(B, [{
    key: 'getB',
    value: function getB () {
      console.log(this.b);
    }
  }]);

  return B;
}(A);

var b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
