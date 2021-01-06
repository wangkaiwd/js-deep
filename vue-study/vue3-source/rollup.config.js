import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    name: 'Vue', // 对于导出值的umd/iife打包文件是必须的，在这种情况下，它是代表你的打包文件的全局变量名
    file: 'dist/umd/vue.js', // 文件写入到的位置
    format: 'umd', // 指定打包生成文件的格式
    sourcemap: true
  },
  plugins: [nodeResolve()]
};
