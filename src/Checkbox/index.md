---
title: Checkbox
order: 0
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
---

# Checkbox 复选框

## 简介

Checkbox 组件是一个基础的交互元素，用于触发操作。

## 用法

<!-- <code src="./index.tsx"></code> -->

```jsx
import React, { useState } from 'react';
import { Text } from 'react-native';
// @ts-ignore
import Checkbox from 'miot/ui/Checkbox';

const Index = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Text>方形</Text>
      <Checkbox
        style={{ width: 60, height: 60 }}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
      <Text>圆形</Text>
      <Checkbox
        style={{ width: 60, height: 60, borderRadius: 30 }}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
    </>
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
