import { timerAdvanceByTime, timerBasic, timerPending } from './demo03';

// 定时器mock可以让定时器立即执行，避免测试执行等待较长时间
jest.useFakeTimers();
test('test timer', () => {
  const fn = jest.fn();
  timerBasic(fn);
  // 直接运行所有的定时器，节省测试时间
  jest.runAllTimers();
  expect(fn).toHaveBeenCalledTimes(1);
});

test('test pending timer', () => {
  const fn = jest.fn();
  timerPending(fn);
  // 这样会运行所有的定时器，而我们只想运行当前执行的定时器，即当前处于pending的定时器
  // jest.runAllTimers();
  // expect(fn).toHaveBeenCalledTimes(1);
  jest.runOnlyPendingTimers();
  expect(fn).toHaveBeenCalledTimes(1);
  jest.runOnlyPendingTimers();
  expect(fn).toHaveBeenCalledTimes(2);
});

test('test timer fast-forward by time', () => {
  const fn = jest.fn();
  timerAdvanceByTime(fn);
  jest.advanceTimersByTime(3000);
  expect(fn).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(11000);
  expect(fn).toHaveBeenCalledTimes(2);
});
