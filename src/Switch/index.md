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
  order: 0
---

# Button 按钮

## 简介

Button 组件是一个基础的交互元素，用于触发操作。

## 用法

```tsx
// @ts-ignore
import Switch from 'miot/ui/Switch';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      style={{ width: 20, height: 10 }}
      onTintColor="red"
      tintColor="blue"
      value={value}
      onValueChange={(value) => setValue(value)}
    />
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
