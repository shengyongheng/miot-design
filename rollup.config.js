import json from '@rollup/plugin-json';
// import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import multiInput from 'rollup-plugin-multi-input';
// import externals from 'rollup-plugin-node-externals';
import { babel } from '@rollup/plugin-babel';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  //   {
  //     input: './src/index.js',
  //     // 输出
  //     output: {
  //       file: pkg.browser, // 文件
  //       format: 'umd', // 格式
  //       name: 'miot-design', // 生成包名称，代表你的 iife/umd 包
  //       plugins: [
  //         json(),
  //         commonjs(), // 加载 commonjs 模块
  //       ],
  //     },
  //   },
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: './src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      json(),
      multiInput(),
      resolve(),
      babel({
        exclude: './node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
      }),
      //   externals({ deps: true })
    ],
  },
];
