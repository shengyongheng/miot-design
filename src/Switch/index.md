---
title: Switch
order: 1
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
---

# Button 按钮

## 简介

Button 组件是一个基础的交互元素，用于触发操作。

## 用法

```jsx
import React from 'react';
import { Text } from 'react-native';
import { Switch } from 'mhui-rn';

export default () => (
  <>
    <Text>基础使用</Text>
    <Switch style={{ width: 60, height: 30 }} />
    <Text>尺寸</Text>
    <Switch style={{ width: 20, height: 10 }} />
    <Text>选中</Text>
    <Switch
      style={{ width: 20, height: 10 }}
      onTintColor="red"
      tintColor="blue"
      value={true}
    />
  </>
);
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
