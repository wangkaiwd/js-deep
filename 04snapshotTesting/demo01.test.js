import { generateConfig } from './demo01';

test('test snapshot', () => {
  // 第一次运行会在测试文件旁边生成一个快照文件，
  // 之后再次运行测试文件，会生成新的快照文件与第一次生成的进行对比，如果不一致就会报错
  // 如果之后内容为正确的内容，那么修改快照，否则需要还原更改
  // watch状态下通过w: show more，然后选择命令进行更新快照
  expect(generateConfig()).toMatchSnapshot();
});
