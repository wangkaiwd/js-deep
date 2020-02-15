import { Utils } from './demo04';

jest.mock('./demo04');
import { useClass } from './useClass';

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
