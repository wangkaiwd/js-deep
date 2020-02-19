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
  it('按下回车后，input框无内容，无操作', () => {
    const fn = jest.fn();
    const container = shallow(<Header addItem={fn}/>);
    container.find('input').simulate('change', {
      target: { value: '' }
    });
    container.find('input').simulate('keyup', {
      target: { keyCode: 13 }
    });
    expect(fn).not.toHaveBeenCalled();
  });
  it('按下回车后，input框有内容，函数被调用', () => {
    const fn = jest.fn();
    const container = shallow(<Header addItem={fn}/>);
    // 每次都要重新获取才行: https://github.com/airbnb/enzyme/issues/2139
    // 官方文档： https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#calling-props-after-a-state-change
    // 官方文档演示例子： https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#calling-props-after-a-state-change
    container.find('input').simulate('change', {
      target: { value: 'something' }
    });
    container.find('input').simulate('keyup', {
      target: { keyCode: 13 }
    });
    expect(fn).toHaveBeenCalled();
  });
});
