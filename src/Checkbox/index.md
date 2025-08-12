---
title: Checkbox 复选框
order: 0
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# Checkbox 复选框

## 简介

| 基本信息  |                             |
| --------- | --------------------------- |
| 中文名称  | 复选框                      |
| 描述      | 多选时可使用，有动效。      |
| 位置      | `miot/ui/Checkbox/Checkbox` |
| SDK_Level | `SDK_10011`                 |
| 注意事项  | \                           |

## 用法

<!-- <code src="./index.tsx"></code> -->

```jsx
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Checkbox } from 'miot-design';

const Index = () => {
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(true);

  return (
    <>
      <Text>方形</Text>
      <Checkbox
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
      <Text>圆形</Text>
      <Checkbox
        checked={checked}
        style={{ borderRadius: 30 }}
        checkedColor="lightgreen"
        onValueChange={(checked) => {
          console.log('checked:', checked);
          setChecked(checked);
        }}
      />
      <Text>禁用</Text>
      <Checkbox
        style={{ borderRadius: 30 }}
        disabled={disabled}
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

| Name          | Type                | Description              |
| ------------- | ------------------- | ------------------------ |
| style         | <code>style</code>  | 样式                     |
| disabled      | <code>bool</code>   | 是否禁用，默认 `false`   |
| checked       | <code>bool</code>   | 是否勾选，默认 `false`   |
| checkedColor  | <code>string</code> | 勾选背景颜色，默认米家绿 |
| onValueChange | `function`          | 点击回调函数             |
