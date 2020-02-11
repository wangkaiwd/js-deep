import { fetchData } from './demo01';
// import axios from 'axios';
// // 不希望在测试用例中执行异步代码从而影响测试用例的执行速度和稳定性，需要模拟生成请求函数
//
// // 模拟模块
// jest.mock('axios');
// test('fetchData 测试', () => {
//   const response = {
//     data: 123
//   };
//   axios.get.mockResolvedValue(response);
//   fetchData().then(res => expect(res.data).toBe(123));
// });

// 手动模拟(manual mocks): https://jestjs.io/docs/en/manual-mocks
jest.mock('./demo01');

test('fetchData 测试', () => {
  fetchData().then(res => expect(res.data).toBe(123));
});
