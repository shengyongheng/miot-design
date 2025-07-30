---
title: StringSpinner
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# StringSpinner 通用选择器

## 简介

IOS、Android 原生组件当前无法渲染

## 用法

```tsx
// @ts-ignore
import StringSpinner from 'miot/ui/StringSpinner';
import React from 'react';

const App = () => {
  return (
    <>
      <StringSpinner
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#ffffff',
        }}
        dataSource={['a', 'b', 'c', 'd']}
        defaultValue={'c'}
        pickerInnerStyle={{
          lineColor: '#cc0000',
          textColor: '#ff0000',
          selectTextColor: '#0000FF',
          fontSize: 12,
          selectFontSize: 30,
          rowHeight: 70,
          selectBgColor: '#f5f5f5',
        }}
        onValueChanged={(data) => {
          // this.updateOneValue(data);
          console.log(data);
        }}
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
