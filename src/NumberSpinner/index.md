---
title: NumberSpinner 数字选择器
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# NumberSpinner 数字选择器

## 简介

| 基本信息  |                                                       |
| --------- | ----------------------------------------------------- |
| 中文名称  | 数字选择器                                            |
| 描述      | 类似于 iOS 的滚轴，通过滚动选择具体数字（仅支持数字） |
| 位置      | `miot/ui/NumberSpinner`                               |
| SDK_Level | `SDK_10003`                                           |
| 注意事项  | \                                                     |

## 用法

```tsx
// @ts-ignore
import { NumberSpinner } from 'miot-design';
import React from 'react';

const App = () => {
  return (
    <>
      <NumberSpinner
        style={{ width: 300, height: 200 }}
        maxValue={30}
        minValue={-100}
        interval={2.5}
        defaultValue={80}
        valueFormat={'%.1f'}
        unit={'km'}
        onNumberChanged={(data) => {
          console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
      />
    </>
  );
};

export default App;
```

## API

| Name            | Type                | Description    |
| --------------- | ------------------- | -------------- |
| visible         | <code>bool</code>   | 是否可见       |
| unit            | <code>string</code> | 单位           |
| max             | <code>int</code>    | 最大值         |
| min             | <code>int</code>    | 最小值         |
| interval        | <code>int</code>    | 步长，默认为 1 |
| defaultValue    | <code>int</code>    | 默认值         |
| valueFormat     | <code>string</code> | 格式           |
| onNumberChanged | <code>func</code>   | 值改变的回调   |
