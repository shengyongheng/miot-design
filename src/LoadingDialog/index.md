---
title: LoadingDialog
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# LoadingDialog 加载列表

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```tsx
// @ts-ignore
import { LoadingDialog } from 'miot-design';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App: React.FC<any> = () => {
  const [visible0, setVisible0] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible0 && setVisible0(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible0(!visible0);
        }}
        title="基本使用"
      />
      <LoadingDialog
        visible={visible0}
        message="加载中，请稍后...(字体大小随系统字体大小变化而变化)"
        timeout={3000}
        onDismiss={(_) => onDismiss('2')}
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
