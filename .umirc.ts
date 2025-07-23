import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Miot-Design',
  favicon: './assets/logo.jpg',
  logo: '/assets/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  devServer: {
    port: '8888',
  },
  theme: {
    // 修改 dumi 默认主题的主色，更多变量详见：https://github.com/umijs/dumi/blob/1.x/packages/theme-default/src/style/variables.less
    '@c-primary': '#1DA57A',
  },
  themeConfig: {
    name: '你好',
    prefersColor: { default: 'light', switch: true },
    socialLinks: {
      github: 'https://github.com/tastien',
    },
  },
  // more config: https://d.umijs.org/config
});
