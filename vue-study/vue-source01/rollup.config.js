import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: {
    name: 'Vue', // 全局变量的名字
    format: 'umd', // 模块化类型
    file: 'dist/umd/vue.js',
    sourcemap: true
  },
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    serve({
      contentBase: ''
    }),
    nodeResolve()
  ]
};
