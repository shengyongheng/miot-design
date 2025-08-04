---
title: ChoiceDialog
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
---

# ChoiceDialog 选择弹窗

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```js
import ChoiceDialog from 'miot/ui/Dialog/ChoiceDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible16, setVisible16] = useState(false);
  const [visible17, setVisible17] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [selectedIndexArray1, setSelectedIndexArray1] = useState([]);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible16 && setVisible16(false);
    visible17 && setVisible17(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible16(!visible16);
        }}
        title="基本使用"
      />
      <ChoiceDialog
        visible={visible16}
        title={'单选弹窗'}
        options={[
          {
            title: 'Test',
            subtitle: 'test',
          },
          {
            title: 'Test',
          },
          {
            title: '测试',
            subtitle: '测试',
          },
        ]}
        selectedIndexArray={selectedIndexArray}
        onDismiss={(_) => onDismiss('16')}
        onSelect={(result) => setSelectedIndexArray(result)}
      />
      <Button
        onPress={() => {
          console.log('多选弹窗');
          setVisible17(!visible17);
        }}
        title="多选弹窗"
      />
      <ChoiceDialog
        type={ChoiceDialog.TYPE.MULTIPLE}
        visible={visible17}
        title={'多选弹窗'}
        options={[
          {
            title: '🙈',
            subtitle: '🙈',
          },
          {
            title: '🙉',
            subtitle: '🙉',
          },
          {
            title: '🙊',
            subtitle: '🙊',
          },
        ]}
        selectedIndexArray={selectedIndexArray1}
        color="#f0ac3d"
        buttons={[
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`选中的选项`, result);
              setVisible17(false);
              setSelectedIndexArray1(result);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('17')}
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
