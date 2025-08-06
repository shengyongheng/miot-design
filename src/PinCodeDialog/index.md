---
title: PinCodeDialog
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# PinCodeDialog 密码弹窗

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```tsx
// @ts-ignore
import { PinCodeDialog } from 'miot-design';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible12, setVisible12] = useState(false);
  const [checkboxData] = useState({
    text: '记住密码',
  });

  const onDismiss = (data) => {
    console.log('data:', data);
    visible12 && setVisible12(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible12(!visible12);
        }}
        title="基本使用"
      />
      <PinCodeDialog
        visible={visible12}
        title="密码/验证码弹窗"
        message={'密码/验证码弹窗'}
        checkboxData={checkboxData}
        digit={6}
        color="#f0ac3d"
        buttons={[
          {
            text: '取消',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible12(false);
            },
          },
          {
            text: '确定',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible12(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('12')}
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
