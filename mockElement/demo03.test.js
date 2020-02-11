import { timer } from './demo03';

test('test timer', () => {
  timer(() => {
    // 如果不写done不会报错
    expect(1).toBe(2);
  });
});
