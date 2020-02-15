import { Utils } from './demo04';

let utils = null;
beforeAll(() => {
  utils = new Utils();
});
test('test class', () => {
  expect(utils.a(1, 2)).toBe(3);
});
