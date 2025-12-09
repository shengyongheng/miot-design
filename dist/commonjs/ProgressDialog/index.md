---
title: ProgressDialog 进度弹窗
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# ProgressDialog 进度弹窗

## 简介

| 基本信息  |                                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 中文名称  | 进度弹窗                                                                                                                                                        |
| 描述      | 在需要用户长时间等待的时候，告知用户当前进度，比如最常用场景：下载。点击背景不会隐藏，可通过改变`visible` 属性隐藏，也可以设置`autoDismiss`在进度完成后自动隐藏 |
| 位置      | `miot/ui/Dialog/ProgressDialog`                                                                                                                                 |
| SDK_Level | `SDK_10022`                                                                                                                                                     |
| 注意事项  | \                                                                                                                                                               |

## 用法

```tsx
// @ts-ignore
import { ProgressDialog } from 'miot-design';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timer = useRef();

  timer.current = setInterval(() => {
    visible && progress < 1 && setProgress(progress + 0.1);
  }, 2000);

  useEffect(() => {
    console.log('progress:', progress);
    if (progress >= 1) {
      clearInterval(timer?.current);
      setProgress(0);
      visible && setVisible(false);
    }
  }, [progress, visible]);

  const onDismiss = (data) => {
    console.log('data:', data);
    // visible && setVisible(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible(!visible);
        }}
        title="基本使用"
      />
      <ProgressDialog
        visible={visible}
        message="下载中，请稍后..."
        color="#f0ac3d"
        unfilledColor="#fff"
        textColor="blue"
        progress={progress}
        onDismiss={(_) => onDismiss('3')}
      />
    </>
  );
};

export default App;
```

## API

| Param         | Type                  | Description                                                                                              |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| animationType | <code>string</code>   | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>     | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible        |
| message       | <code>string</code>   | 提示信息文字                                                                                             |
| progress      | <code>number</code>   | 当前进度，默认`0`，范围为 `0～1`                                                                         |
| color         | <code>string</code>   | progressBar 填充颜色，默认米家绿                                                                         |
| unfilledColor | <code>string</code>   | progressBar 未填充颜色，默认`#f1f1f1`                                                                    |
| textColor     | <code>string</code>   | 进度百分比文字颜色，默认米家绿                                                                           |
| autoDismiss   | <code>bool</code>     | 是否在进度条读完之后自动隐藏 Modal, 默认`false`                                                          |
| onDismiss     | <code>function</code> | Modal 隐藏时的回调函数                                                                                   |
