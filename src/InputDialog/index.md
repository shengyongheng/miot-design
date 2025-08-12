---
title: InputDialog 输入弹窗
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# InputDialog 输入弹窗

## 简介

| 基本信息  |                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  | 输入弹窗                                                                                                                                   |
| 描述      | 提示用户录入信息并记录。输入框弹窗的业务场景有时候会很复杂，如果本组件无法满足你的业务需求，请使用 `AbstractDialog` 参考本组件源码自行实现 |
| 位置      | `miot/ui/Dialog/InputDialog`                                                                                                               |
| SDK_Level | `SDK_10022`                                                                                                                                |
| 注意事项  | `TextInput` 的 `onEndEditing`不能使用                                                                                                      |

## 用法

```tsx
// @ts-ignore
import { InputDialog } from 'miot-design';
// import InputDialog from 'miot/ui/Dialog/InputDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);
  const [visible11, setVisible11] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible8 && setVisible8(false);
    visible9 && setVisible9(false);
    visible10 && setVisible10(false);
    visible11 && setVisible11(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible8(!visible8);
        }}
        title="基本使用"
      />
      <InputDialog
        visible={visible8}
        title="最简单输入弹窗"
        onDismiss={(_) => onDismiss('8')}
      />
      <Button
        onPress={() => {
          console.log('带下划线输入弹窗');
          setVisible9(!visible9);
        }}
        title="带下划线输入弹窗"
      />
      <InputDialog
        type={InputDialog.TYPE.UNDERLINE}
        visible={visible9}
        title="带下划线输入弹窗"
        underlineData={{
          leftText: '请输入你的ID',
          underlineText: '还没有ID？注册一个',
          onPress: (_) => console.log('你注册的ID是123456'),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible9(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible9(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('9')}
      />
      <Button
        onPress={() => {
          console.log('带☑️输入弹窗');
          setVisible10(!visible10);
        }}
        title="带☑️输入弹窗"
      />
      <InputDialog
        type={InputDialog.TYPE.CHECKBOX}
        visible={visible10}
        title="带☑️输入弹窗"
        checkboxData={{
          checked: true,
          text: '记住密码',
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible10(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible10(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('10')}
      />
      <Button
        onPress={() => {
          console.log('多TextInput复杂输入弹窗');
          setVisible11(!visible11);
        }}
        title="多TextInput复杂输入弹窗"
      />
      <InputDialog
        visible={visible11}
        type={InputDialog.TYPE.BOTH}
        color="#f0ac3d"
        title="多TextInput复杂输入弹窗"
        underlineData={{
          leftText: '请输入你的ID',
          underlineText: '还没有ID？注册一个',
          onPress: (_) => console.log('你注册的ID是123456'),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible11(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible11(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('11')}
      />
    </>
  );
};

export default App;
```

## API

#### TYPE(输入弹窗的类型)

| Name      | Type                | Default                            | Description                                                 |
| --------- | ------------------- | ---------------------------------- | ----------------------------------------------------------- |
| SIMPLE    | <code>string</code> | <code>&quot;simple&quot;</code>    | 普通，只有输入框                                            |
| UNDERLINE | <code>string</code> | <code>&quot;underline&quot;</code> | 输入框上方有文字说明和下划线超链接                          |
| CHECKBOX  | <code>string</code> | <code>&quot;checkbox&quot;</code>  | 输入框下方有勾选框和文字                                    |
| BOTH      | <code>string</code> | <code>&quot;both&quot;</code>      | 输入框上方有文字说明和下划线超链接 输入框下方有勾选框和文字 |

#### UnderlineData(输入框上方下划线数据)

| Name          | Type                  | Description                                                                                        |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| leftText      | <code>string</code>   | 左侧说明文字 10045 后失效                                                                          |
| underlineText | <code>string</code>   | 右侧下划线文字                                                                                     |
| onPress       | <code>function</code> | 点击下划线文字的回调函数                                                                           |
| useNewTheme   | <code>bool</code>     | 是否使用新样式, 10045 新增-之后*必须*使用新下划线样式(更改为输入框下方，并且不能添加左侧说明文字） |

#### Input(输入框)

| Name           | Type                  | Description                                                                                       |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| placeholder    | <code>string</code>   | 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder            |
| defaultValue   | <code>string</code>   | 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue       |
| onChangeText   | <code>function</code> | 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext       |
| textInputProps | <code>Object</code>   | 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props |
| isCorrect      | <code>bool</code>     | 10045 新增 输入框的结果 - 输入框边框变红，下方显示红色警示文字                                    |
| type           | <code>string</code>   | 输入框右侧的图案类型，默认'NONE'-无, 'DELETE'-删除键, 'SECURE'-眼睛状密码遮挡                     |

#### CheckboxData(输入框下方勾选框数据)

| Name    | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| checked | <code>boolean</code> | 勾选框的初始勾选状态 |
| text    | <code>string</code>  | 勾选框右侧的说明文字 |

| Param            | Type                                                             | Description                                                                                                           |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| animationType    | <code>string</code>                                              | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype              |
| visible          | <code>bool</code>                                                | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible                     |
| type             | [<code>TYPE</code>](#TYPE输入弹窗的类型)                         | 输入弹窗的类型。是否只有输入框，输入框上方是否有下划线超链接，输入框下方是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE` |
| color            | <code>string</code>                                              | 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿                                                                 |
| title            | <code>string</code>                                              | 标题文字                                                                                                              |
| underlineData    | [<code>UnderlineData</code>](#UnderlineData输入框上方下划线数据) | 输入框上方的数据，包括左侧说明文字，右侧下划线文字及其点击回调函数，只对 `TYPE.UNDERLINE` 和 `TYPE.BOTH` 有效         |
| inputs           | [<code>Array&lt;Input&gt;</code>](#Input输入框)                  | 输入框数组，定义输入框的属性，对所有的 `TYPE` 有效                                                                    |
| checkboxData     | [<code>CheckboxData</code>](#CheckboxData输入框下方勾选框数据)   | 输入框下方的数据，包括勾选状态，描述文字，只对 `TYPE.CHECKBOX` 和 `TYPE.BOTH` 有效                                    |
| buttons          | [<code>Array&lt;Button&gt;</code>](#button按钮)                  | 和`AbstractDialog`的`buttons`属性相同                                                                                 |
| onDismiss        | <code>function</code>                                            | Modal 隐藏时的回调函数                                                                                                |
| isCorrect        | <code>bool</code>                                                | 10045 新增 弹窗的结果 - 副标题下会显示红色警示文字                                                                    |
| warnText         | <code>string</code>                                              | 10045 新增 副标题下的红色警示文字                                                                                     |
| inputWarnText    | <code>string</code>                                              | 10045 新增 输入框下的红色警示文字                                                                                     |
| noInputDisButton | <code>bool</code>                                                | 10048 新增 是否有[无输入内容时无法点击确认按钮]的逻辑，默认无(false), 设置[defaultValue 初始默认文字]也算作有输入内容 |
