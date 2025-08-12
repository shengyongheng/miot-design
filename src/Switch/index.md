---
title: Switch 开关
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

# Switch 开关

## 简介

| 基本信息  |                      |
| --------- | -------------------- |
| 中文名称  | 开关                 |
| 描述      | 简单的开关，有动效。 |
| 位置      | `miot/ui/Switch`     |
| SDK_Level | `SDK_10020`          |
| 注意事项  | \                    |

## 用法

```tsx
// @ts-ignore
import { Switch } from 'miot-design';
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

| Name          | Type                  | Description              |
| ------------- | --------------------- | ------------------------ |
| value         | <code>bool</code>     | 开关状态，默认值 `false` |
| style         | <code>style</code>    | 开关样式，仅支持宽高     |
| onTintColor   | <code>string</code>   | 打开时的背景颜色         |
| tintColor     | <code>string</code>   | 关闭时的背景颜色         |
| disabled      | <code>bool</code>     | 是否禁用，默认值 `false` |
| onValueChange | <code>function</code> | 切换开关的回调函数       |
