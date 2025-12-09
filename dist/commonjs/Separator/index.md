---
title: Separator
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
  order: 0
---

# Separator 分割线

## 简介

| 基本信息  |                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| 中文名称  | 分割线                                                                                                     |
| 描述      | 细分割线，包括横线和竖线，常用于导航栏和列表项等                                                           |
| 位置      | `miot/ui/Separator`                                                                                        |
| SDK_Level | `SDK_10004`                                                                                                |
| 说明      | `<View style={{ height: 0.5, width: 300 }} />`的细分割线在`android`和`iOS`平台上显示不一致，于是才有了它。 |
| 注意事项  | 细线的宽度有最大限制(**max = 1**)                                                                          |

## 用法

```jsx
import { Separator } from 'miot-design';
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

| Name  | Type               | Description                                                               |
| ----- | ------------------ | ------------------------------------------------------------------------- |
| type  | `string`           | 分割线类型，横向`row`或者纵向`column`，默认横向<br />(`❗️SDK_10021`新增) |
| style | <code>style</code> | 自定义样式                                                                |
