import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('渲染测试', () => {
  // 只渲染App,对于App中的子组件只是以一个标记来代替，并不是真正渲染
  const wrapper = shallow(<App/>);
  // expect(wrapper.find('div').length).toBe(1);
  // 通过属性选择器，来保证即使代码的class(使用类选择器的话)发生改变，测试用例也可以照常使用
  // expect(wrapper.find('[data-test="app"]').prop('title')).toBe('test title');
  expect(wrapper.find('[data-test="app"]')).toExist();
});
