---
title: CommonCard
group:
  path: '/business'
  title: 业务组件
  order: 0
nav:
  title: '组件'
  path: /components
---

# CommonCard 通用卡片

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```jsx
import React from 'react';
import { CommonCard, Provider } from 'miot-design';

const App = (props) => {
  return (
    <Provider
      theme={{
        color: 'red',
        backgroundColor: 'silver',
      }}
    >
      <CommonCard title="标题" count={100} isActive2={true} />
    </Provider>
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
