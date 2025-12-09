---
title: LoadingDialog 加载弹窗
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

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 加载弹窗                                                     |
| 描述      | 通过加载动画和文案提示用户需要等待，点击背景不会隐藏，可通过改变`visible` 属性隐藏，也可以设置超时时间 |
| 位置      | `miot/ui/Dialog/LoadingDialog`                               |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

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

| Param         | Type                  | Description                                                  |
| ------------- | --------------------- | ------------------------------------------------------------ |
| animationType | <code>string</code>   | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>     | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| message       | <code>string</code>   | 显示文字                                                     |
| timeout       | <code>number</code>   | Modal 隐藏的超时时间(ms)，如果不主动设置隐藏的话             |
| onDismiss     | <code>function</code> | Modal隐藏时的回调函数                                        |
