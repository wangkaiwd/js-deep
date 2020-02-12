import { testCallback, testPromise, testPromiseError } from './demo01';
// 存在异步逻辑没有测试的话WebStorm不会报错
test('testCallback', (done) => {
  const fn = jest.fn((data) => {
    // 如果不对异步内容处理的话,jest会做出警告，并且及时测试失败也不会报错
    expect(data).toBe('peanut butter');
    done();
  });
  testCallback(fn);
});

test('testPromise', () => {
  // 测试Promise不需要使用done,只需要将Promise返回即可
  // return testPromise().then(result => expect(result).toBe('peanut butter'));
  // 也可以使用使用.resolves匹配器
  return expect(testPromise()).resolves.toMatch('peanut butter');
});

test('testPromiseError', () => {
  // expect.assertions(1); // 核实在测试过程中特定数量的断言被调用
  // return testPromiseError().catch(e => expect(e).toMatch('error'));
  // 也可以使用.rejects匹配器
  return expect(testPromiseError()).rejects.toMatch('error');
});

test('async/await test', async () => {
  const data = await testPromise();
  expect(data).toMatch('peanut butter');
});

test('async/await test fails with an error', async () => {
  expect.assertions(1);
  try {
    await testPromiseError();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
