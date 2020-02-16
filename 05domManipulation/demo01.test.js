import { addDivToBody } from './demo01';

test('test add divToBody', () => {
  addDivToBody();
  addDivToBody();
  addDivToBody();
  const children = Array.from(document.body.children);
  const divs = children.map(item => item.tagName === 'DIV');
  expect(divs.length).toBe(3)
});
