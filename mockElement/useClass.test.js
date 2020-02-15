import { Utils } from './demo04';
// 在同级目录中有__mocks__的时候会使用该文件下的同名文件进行manual mock
jest.mock('./demo04');
import { useClass } from './useClass';

// 调用jest.mock('./demo04')会返回一个有用的"自动mock"，你可以用用来监察class 构造器和class所有方法的调用
// 它将会用mock constructor来替换es6 class,并且用总是会返回undefined的mock function(jest.fn())来替换所有class的方法
// 测试useClass方法：测试Utils,utils.a,utils.b都执行即可
test('test useClass', () => {
  useClass();
  // 所有的mock函数都有一个特殊的mock属性：
  //  1. 函数被调用的相关信息
  //  2. 函数的返回值信息
  //  3. 函数的实例信息(this)
  console.log('utils', Utils.mock);
  expect(Utils).toHaveBeenCalled();
  expect(Utils.mock.instances[0].a).toHaveBeenCalled();
  expect(Utils.mock.instances[0].b).toHaveBeenCalled();
});
