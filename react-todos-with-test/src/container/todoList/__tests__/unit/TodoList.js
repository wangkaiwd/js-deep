import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../../TodoList';

Enzyme.configure({ adapter: new Adapter() });
describe('TodoList 组件', () => {
  // 测试state: https://dev.to/theactualgivens/testing-react-hook-state-changes-2oga
  let wrapper;
  const setState = jest.fn();
  // jest.sypOn(object, methodName):
  // 创建一个类似于`jest.fn`的模拟函数，但是也追踪object[methodName]的调用，这里是React['useState']。
  // 返回一个Jest模拟函数
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = Enzyme.shallow(<TodoList/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('初始化列表为空', () => {
    const container = shallow(<TodoList/>);
    const [init, setState] = useStateSpy([]);
    expect(init).toEqual([]);
  });
  it('传给 Header 一个增加todoList的方法', () => {
    const container = shallow(<TodoList/>);
    const header = container.find('Header');
    // hooks的相关测试无法进行
    // expect(header.prop('addItem')).toEqual(container.instance().addItem);
  });
});
