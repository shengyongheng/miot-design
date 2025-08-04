---
title: MessageDialog
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# MessageDialog 消息弹窗

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```tsx
// @ts-ignore
import MessageDialog from 'miot/ui/Dialog/MessageDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible4 && setVisible4(false);
    visible5 && setVisible5(false);
    visible6 && setVisible6(false);
    visible7 && setVisible7(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('无标题');
          setVisible4(!visible4);
        }}
        title="无标题"
      />
      <MessageDialog
        visible={visible4}
        buttons={[
          {
            text: '我了解了',
            style: { color: 'lightpink' },
            callback: (_) => setVisible4(false),
          },
        ]}
        onDismiss={(_) => onDismiss('4')}
      />
      <Button
        onPress={() => {
          console.log('有标题');
          setVisible5(!visible5);
        }}
        title="有标题"
      />
      <MessageDialog
        visible={visible5}
        title="消息弹窗自定义标题"
        message={'消息弹窗自定义标题'}
        buttons={[
          {
            text: '消失',
            style: { color: 'lightpink' },
            callback: (_) => setVisible5(false),
          },
          {
            text: '不消失',
            style: { color: 'lightblue' },
            callback: (_) => console.log('不消失'),
          },
        ]}
        onDismiss={(_) => onDismiss('5')}
      />
      <Button
        onPress={() => {
          console.log('带下划线');
          setVisible6(!visible6);
        }}
        title="带下划线"
      />
      <MessageDialog
        type={MessageDialog.TYPE.UNDERLINE}
        visible={visible6}
        color="#f0ac3d"
        title="下划线消息弹窗"
        message={'下划线消息弹窗'}
        extraText="你点我一下试试"
        extra={{
          onPress: (_) => console.log('点击了下划线'),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible6(false),
          },
          {
            text: '确认',
            style: { color: 'lightblue' },
            callback: (obj) => {
              console.log(`是否点击了下划线: ${obj.hasPressUnderlineText}`);
              setVisible6(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('6')}
      />
      <Button
        onPress={() => {
          console.log('带勾选框');
          setVisible7(!visible7);
        }}
        title="带勾选框"
      />
      <MessageDialog
        type={MessageDialog.TYPE.CHECKBOX}
        visible={visible7}
        color="#f0ac3d"
        title="勾选框消息弹窗"
        message={'勾选框消息弹窗'}
        extraText="快点我试试"
        extra={{
          onPress: (_) => console.log("点击了'快点我试试'"),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible7(false),
          },
          {
            text: '确认',
            style: { color: 'lightblue' },
            callback: (obj) => {
              console.log(`是否勾选: ${obj.checked}`);
              setVisible7(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('7')}
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
