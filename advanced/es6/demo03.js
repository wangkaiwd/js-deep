// babel 转义class以及extends
function _typeof (obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof (obj) { return typeof obj; };
  } else {
    _typeof = function _typeof (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }
  return _typeof(obj);
}

function _inherits (subClass, superClass) { // Tiger Animal
  if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function'); }
  // superClass maybe null or function
  // second argument(properties): 添加到新创建对象自身定义的属性
  //      configurable: true 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除， 默认false
  //      value: 与属性关联的值
  //      writable: 当且仅当与该属性相关联的值可以用assignment operator改变时
  // Tiger继承Animal原型上的方法，并且更正constructor的指向
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  // 相当于 Tiger.__proto__ = Animal
  // 所以Tiger.xxx如果在自身生没有的话，会去Animal上进行查找，相当于继承静态方法
  if (superClass) _setPrototypeOf(subClass, superClass);
}

// 这里用到了高阶函数：惰性函数，只有在第一次执行时会判断Object.setPrototypeOf是否存在
// 之后执行时将直接执行第一次的判断后的结果，对性能进行了优化，避免了每次执行时都进行执行环境的检查
function _setPrototypeOf (o, p) {
  // 该处创建的函数的堆内存会一直被全局执行上下文中的_setPrototypeOf占用
  // 所以这里的执行上下文不会被销毁，形成闭包，可以在下面的函数通过作用域链获取到该执行上下文中的变量对象中的变量
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _createSuper (Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function () {
    // Tiger.__proto__ = undefined
    // Super = Tiger
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      // this, instance of Tiger
      // arguments: { new Tiger调用时的参数,length:xx}
      // result = Tiger.apply(this, arguments)
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn (self, call) {
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
    descriptor.enumerable = descriptor.enumerable || false;
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

var Animal = /*#__PURE__*/function () {
  function Animal (name) {
    _classCallCheck(this, Animal);

    this.name = name;
  }

  _createClass(Animal, [{
    key: 'say',
    value: function say () {
      console.log('say');
    }
  }], [{
    key: 'a',
    value: function a () {
      return 100;
    }
  }]);

  return Animal;
}();

var Tiger = /*#__PURE__*/function (_Animal) {
  _inherits(Tiger, _Animal);

  var _super = _createSuper(Tiger);

  function Tiger () {
    _classCallCheck(this, Tiger);
    return _super.apply(this, arguments);
  }

  return Tiger;
}(Animal);

const tiger = new Tiger();
tiger.say();
