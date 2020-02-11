jest.mock('./demo02');
import { add } from './demo02';
// 使用jest.mock后，可以通过mockImplementation来函数进行模拟实现
// mockImplementation: 定义从其它模块创建的mock function的默认实现
// add.mockImplementation((a, b) => a);
const myMockFn = jest.fn()
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

test('mockImplementation test', () => {
  console.log('add', add);
  // expect(add(1, 2)).toBe(3);
  myMockFn((err, val) => {
    console.log(val); // true
  });
  myMockFn((err, val) => {
    console.log(val); // false
  });
});
