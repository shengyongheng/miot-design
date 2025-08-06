---
title: ProgressDialog
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

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

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

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
