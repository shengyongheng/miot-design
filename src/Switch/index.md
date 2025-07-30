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
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Switch } from 'mhui-rn';

const App: React.FC<any> = () => {
  const [value, setValue] = useState(true);

  return (
    <>
      <Text>基础使用</Text>
      <Switch
        onTintColor="red"
        tintColor="blue"
        value={value}
        onValueChange={(value: boolean) => setValue(value)}
      />
      <Text>尺寸</Text>
      <Switch
        style={{ width: 20, height: 10 }}
        onTintColor="red"
        tintColor="blue"
        value={value}
        onValueChange={(value: boolean) => setValue(value)}
      />
      <Text>选中</Text>
      <Switch
        style={{ width: 20, height: 10 }}
        onTintColor="red"
        tintColor="blue"
        value={value}
        onValueChange={(value: boolean) => setValue(value)}
      />
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
