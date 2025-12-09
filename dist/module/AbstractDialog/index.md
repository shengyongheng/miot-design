---
title: AbstractDialog 通用弹窗
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# AbstractDialog 通用弹窗

## 简介

| 基本信息  |                                                                              |
| --------- | ---------------------------------------------------------------------------- |
| 中文名称  | 米家插件通用弹窗容器                                                         |
| 描述      | 符合米家插件设计规范的通用弹窗容器，除顶部标题和底部按钮外，可自定义弹窗内容 |
| 位置      | `miot/ui/Dialog/AbstractDialog`                                              |
| SDK_Level | `SDK_10022`                                                                  |
| 注意事项  | \                                                                            |

## 用法

```tsx
// @ts-ignore
import { AbstractDialog } from 'miot-design';
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

#### Button(按钮)

| Name             | Type                                                           | Description                                                                                                 |
| ---------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| text             | <code>string</code>                                            | 按钮的文字                                                                                                  |
| style            | <code>style</code>                                             | 按钮的样式 10045 更新：此处设置文字颜色无效                                                                 |
| callback         | <code>function</code>                                          | 点击按钮的回调函数                                                                                          |
| allowFontScaling | <code>bool</code>                                              | 10040 新增 text 是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`                              |
| numberOfLines    | <code>number</code>                                            | 10040 新增 text 文字的行数，默认 undefined (兼容旧版) 10044 更新:按钮文字最多显示一行                       |
| colorType        | <code>string</code>                                            | 10045 新增 按钮的几种颜色类型 'blueLayerWhite'蓝底白字 , 'grayLayerBlack'灰底黑字, 'grayLayerBlue' 灰底蓝字 |
| disabled         | <code>bool</code>                                              | 10045 新增 设为 true，禁止交互                                                                              |
| backgroundColor  | <code>{ bgColorNormal: string; bgColorPressed: string }</code> | 10045 新增 自定义按钮背景颜色                                                                               |
| titleColor       | <code>string</code>                                            | 10045 新增 文字颜色                                                                                         |

| Param         | Type                                            | Description                                                                                                          |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| animationType | <code>string</code>                             | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype             |
| visible       | <code>bool</code>                               | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible                    |
| style         | <code>style</code>                              | modal 的自定义样式                                                                                                   |
| title         | <code>string</code>                             | 标题                                                                                                                 |
| subtitle      | <code>string</code>                             | 副标题                                                                                                               |
| showTitle     | <code>bool</code>                               | 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true`                                                |
| showSubtitle  | <code>bool</code>                               | 是否显示副标题，默认`false`                                                                                          |
| canDismiss    | <code>bool</code>                               | 是否允许点击蒙层背景隐藏 Modal，默认`true`                                                                           |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮) | 按钮数组，定义底部按钮的属性，只能显示 1 ～ 2 个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal |
| showButton    | <code>bool</code>                               | 是否显示按钮，默认`true`                                                                                             |
| onDismiss     | <code>function</code>                           | 点击`Modal`内容外面/取消按钮/确定按钮，Modal 隐藏时的回调函数                                                        |
| useNewTheme   | <code>bool</code>                               | 10045 新增 是否使用新样式，默认 false 10045 后 _! 必须 !_ 使用新样式 旧样式将被废弃                                  |
