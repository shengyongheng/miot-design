---
title: PinCodeDialog 密码弹窗

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

| 基本信息  |                                               |
| --------- | --------------------------------------------- |
| 中文名称  | 密码弹窗                                      |
| 描述      | 用于输入密码或者验证码，允许输入**3 ～ 6 位** |
| 位置      | `miot/ui/Dialog/PinCodeDialog`                |
| SDK_Level | `SDK_10022`                                   |
| 注意事项  |                                               |

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

### CheckboxData(勾选框相关数据)

| Name    | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| checked | <code>boolean</code> | 勾选框的初始勾选状态 |
| text    | <code>string</code>  | 勾选框右侧的说明文字 |

| Param         | Type                                                     | Description                                                                                              |
| ------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| animationType | <code>string</code>                                      | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                                        | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible        |
| title         | <code>string</code>                                      | 标题文字                                                                                                 |
| message       | <code>string</code>                                      | 文字说明                                                                                                 |
| digit         | <code>number</code>                                      | 输入框数量，允许 3 ～ 6 个，默认是 6 个                                                                  |
| color         | <code>string</code>                                      | 勾选框的勾选颜色 / 输入框 focus 时的边框颜色，默认米家绿                                                 |
| checkboxData  | [<code>CheckboxData</code>](#CheckboxData勾选框相关数据) | 输入框下方的勾选状态和描述文字，如果不传将不显示                                                         |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮)          | 和`AbstractDialog`的`buttons`属性相同                                                                    |
| onDismiss     | <code>function</code>                                    | Modal 隐藏时的回调函数                                                                                   |
