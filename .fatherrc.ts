export default {
  // 指定入口文件
  entry: 'src/index.js',
  // 打包类型
  esm: {
    type: 'babel',
    file: 'father-dist/esm/index.js',
  },
  cjs: {
    type: 'babel',
    file: 'father-dist/cjs/index.js',
  },
  // 禁用类型检查
  disableTypeCheck: true,
  // 将 helper 方法提取到 @babel/runtime 中
  runtimeHelpers: true,
  // 指定浏览器兼容性
  autoprefixer: {
    browsers: ['ie>9', 'Safari >= 6'],
  },
};
