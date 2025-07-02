---
title: CheckBox
group:
  title: CheckBox
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
import { Checkbox } from 'lalala-components-rn';

export default () => <Checkbox label="全选" />;
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
