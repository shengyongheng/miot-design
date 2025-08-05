---
title: TitleBar
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# TitleBar 导航栏

## 简介

米家通用导航栏，目前正在开发新版导航栏

## 用法

```jsx
// @ts-ignore
import { TitleBar } from 'mhui-rn-fixed';
import React from 'react';

const Index = () => {
  return (
    <TitleBar
      type="light"
      title="title"
      subTitle="subtitle"
      style={{
        height: 65,
        backgroundColor: '#222',
      }}
      onPressLeft={() => {
        // navigation.goBack();
      }}
      onPressLeft2={() => console.log('onPressLeft2')}
      onPressRight={() => {
        // navigation.navigate('moreMenu', { title: '设置' });
      }}
      onPressRight2={() => console.log('onPressRight2')}
      showDot={true}
    />
  );
};

export default Index;
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
