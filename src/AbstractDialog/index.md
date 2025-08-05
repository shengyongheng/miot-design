---
title: AbstractDialog
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# ListItem 普通列表项

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```tsx
// @ts-ignore
import { AbstractDialog } from 'mhui-rn-fixed';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const App = () => {
  const [visible0, setVisible0] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible0 && setVisible0(false);
    visible1 && setVisible1(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible0(!visible0);
        }}
        title="基本使用"
        color="#841584"
      />
      <AbstractDialog
        visible={visible0}
        title={'基本使用'}
        subtitle={'testTitle'}
        showSubtitle
        onDismiss={() => onDismiss('0')}
      />
      <Button
        onPress={() => {
          console.log('自定义内容');
          setVisible1(!visible1);
        }}
        title="自定义内容"
        color="#841584"
      />
      <AbstractDialog
        visible={visible1}
        title={'自定义内容'}
        subtitle={'testTitle'}
        showSubtitle
        onDismiss={() => onDismiss('1')}
        buttons={[
          {
            text: '是吗',
            style: { color: 'lightpink' },
            callback: () => console.log('是吗'),
          },
          {
            text: '是啊',
            style: { color: '#f0ac3d' },
            callback: () => console.log('是啊'),
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            height: 200,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>你看她笑得多开心啊</Text>
        </View>
      </AbstractDialog>
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
