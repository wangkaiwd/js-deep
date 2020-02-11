// 手动模拟(manual mocks): https://jestjs.io/docs/en/manual-mocks
// jest会默认将jest.mock放在任何代码之前执行，和位置无关：https://jestjs.io/docs/en/manual-mocks#using-with-es-module-imports
// 会引用当前目录下的__mocks__下的demo01.js来替换真正./demo01.js中的代码实现，从而进行模拟测试
jest.mock('./demo01');
// 引入真实的模块，否则会用jest.mock中的模拟实现，没有实现的话就会报错
// 一般情况下，我们会将异步代码进行模拟实现，而同步代码不需要模拟。从而保证测试时间的快速和稳定
const { getNumber } = jest.requireActual('./demo01');
import { fetchData } from './demo01';
// import axios from 'axios';
// // 不希望在测试用例中执行异步代码从而影响测试用例的执行速度和稳定性，需要模拟生成请求函数
// // 模拟模块
// jest.mock('axios');
// test('fetchData 测试', () => {
//   const response = {
//     data: 123
//   };
//   axios.get.mockResolvedValue(response);
//   fetchData().then(res => expect(res.data).toBe(123));
// });

test('fetchData 测试', () => {
  fetchData().then(res => expect(res.data).toBe(123));
});

test('getNumber 测试', () => {
  expect(getNumber()).toBe(123);
});
