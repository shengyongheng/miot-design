---
title: BlankPage
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
  order: 0
---

# BlankPage 空白页面

## 简介

BlankPage 组件是一个基础的交互元素，用于触发操作。

## 用法

```jsx
// @ts-ignore
import { BlankPage } from 'mhui-rn-fixed';
import React from 'react';

const App = () => {
  const props1 = {
    // type: BlankPage.TYPE.BUTTON, // 默认是按钮
    button: {
      text: '无列表时点击此按钮',
      callback: () => console.log('点击按钮'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  const props2 = {
    type: BlankPage.TYPE.UNDERLINE,
    underline: {
      text: '无列表时点击此链接',
      callback: () => console.log('点击超链接'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  return (
    <>
      <BlankPage {...props1} />
      <BlankPage {...props2} />
    </>
  );
};

export default App;
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
