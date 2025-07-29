---
title: Separator
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
---

# Separator 分割线

## 简介

Separator 组件是一个基础的交互元素，用于触发操作。

## 用法

```jsx
// @ts-ignore
import Separator from 'miot/ui/Separator';
import React, { useState } from 'react';

const App = () => {
  return (
    <>
      <Separator style={{ width: '100px' }} />
      {/* <Separator style={{ margin: '24 0', height: 20 }} /> */}
      {/* <Separator type="column" /> */}
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
