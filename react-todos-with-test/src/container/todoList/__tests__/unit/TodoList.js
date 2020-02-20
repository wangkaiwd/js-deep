import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from '../../TodoList';

Enzyme.configure({ adapter: new Adapter() });
describe('TodoList 组件', () => {
  // 测试state: https://dev.to/theactualgivens/testing-react-hook-state-changes-2oga
  let wrapper;
  const setState = jest.fn();
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
});
