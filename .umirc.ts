import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'miot-design',
  favicon: '/assets/images/Mijia_icon.png',
  logo: '/assets/images/Mijia_icon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // 单语言配置方式如下
  // navs: [
  //   null, // null 值代表保留约定式生成的导航，只做增量配置
  //   {
  //     title: 'GitHub',
  //     path: 'https://github.com/umijs/dumi',
  //   },
  //   {
  //     title: '我有二级导航',
  //     path: '链接是可选的',
  //     // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
  //     children: [
  //       { title: '第一项', path: 'https://d.umijs.org' },
  //       { title: '第二项', path: '/guide' },
  //     ],
  //   },
  // ],
  devServer: {
    port: '8888',
  },
  theme: {
    // 修改 dumi 默认主题的主色，更多变量详见：https://github.com/umijs/dumi/blob/1.x/packages/theme-default/src/style/variables.less
    '@c-primary': '#1DA57A',
  },
  // 如何生效?
  themeConfig: {
    name: '你好',
    prefersColor: { default: 'light', switch: true },
    socialLinks: {
      github: 'https://github.com/tastien',
    },
  },
  // more config: https://d.umijs.org/config
});