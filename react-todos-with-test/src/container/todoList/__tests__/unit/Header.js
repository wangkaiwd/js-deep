import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });
describe('Header 组件', () => {
  it('包含一个input框', () => {
    const container = shallow(<Header/>);
    const inputElement = container.find('input');
    expect(inputElement.length).toBe(1);
  });
  it('input框初始内容为空', () => {
    const container = shallow(<Header/>);
    const inputElement = container.find('input');
    expect(inputElement.prop('value')).toBe('');
  });
  it('input中输入内容时，state会跟随输入内容发生变化', () => {
    const container = shallow(<Header/>);
    const inputElement = container.find('input');
    const inputValue = 'input value';
    inputElement.simulate('change', {
      target: { value: inputValue }
    });
    // 这里为什么需要重新获取input?
    expect(container.find('input').prop('value')).toBe(inputValue);
  });
});
