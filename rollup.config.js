import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: 'rollup/dist/commonjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'rollup/dist/module/index.js',
      format: 'esm',
      exports: 'named',
    },
  ],
  // 外部依赖，不会打包进最终产物
  external: [
    'react',
    'react-native',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    json(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
