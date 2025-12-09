---
title: BlankPage 空白页面
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
  order: 0
---

# BlankPage 空白页面

## 简介

| 基本信息  |                                                                |
| --------- | -------------------------------------------------------------- |
| 中文名称  | 空白页面                                                       |
| 描述      | 就是一个普通的空白页面，在数据未加载完毕或者加载失败的时候显示 |
| 位置      | `miot/ui/BlankPage`                                            |
| SDK_Level | `SDK_10024`                                                    |
| 注意事项  | \                                                              |

## 用法

```jsx
// @ts-ignore
import { BlankPage } from 'miot-design';
import React from 'react';

const App = () => {
  const props1 = {
    // type: BlankPage.TYPE.BUTTON, // 默认是按钮
    button: {
      text: '无列表时点击此按钮',
      callback: () => console.log('点击按钮'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  const props2 = {
    type: BlankPage.TYPE.UNDERLINE,
    underline: {
      text: '无列表时点击此链接',
      callback: () => console.log('点击超链接'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  return (
    <>
      <BlankPage {...props1} />
      <BlankPage {...props2} />
    </>
  );
};

export default App;
```

## API

### TYPE(空白页面底部视图类型)

| Name      | Type                | Value                              | Description        |
| --------- | ------------------- | ---------------------------------- | ------------------ |
| BUTTON    | <code>string</code> | <code>&quot;button&quot;</code>    | 底部是按钮         |
| UNDERLINE | <code>string</code> | <code>&quot;underline&quot;</code> | 底部是下划线超链接 |

### Underline(下划线)

| Name      | Type                             | Description          |
| --------- | -------------------------------- | -------------------- |
| text      | <code>string</code>              | 下划线文字           |
| textStyle | <code>ViewPropTypes.style</code> | 文字样式             |
| callback  | <code>function</code>            | 点击下划线的回调函数 |

### Button(按钮)

| Name        | Type                             | Description        |
| ----------- | -------------------------------- | ------------------ |
| text        | <code>string</code>              | 按钮文字           |
| buttonStyle | <code>ViewPropTypes.style</code> | 按钮样式           |
| textStyle   | <code>ViewPropTypes.style</code> | 按钮文字样式       |
| callback    | <code>function</code>            | 点击按钮的回调函数 |

| Param     | Type                                           | Description                                           |
| --------- | ---------------------------------------------- | ----------------------------------------------------- |
| type      | [<code>TYPE</code>](#TYPE空白页面底部视图类型) | 空白页面底部视图类型，是按钮还是下划线，默认是按钮    |
| underline | [<code>Underline</code>](#Underline下划线)     | 下划线相关数据，`TYPE.UNDERLINE`时有效                |
| button    | [<code>Button</code>](#button按钮-1)           | 按钮相关数据，`TYPE.BUTTON`时有效                     |
| icon      | <code>resource</code>                          | 图标资源                                              |
| iconStyle | <code>ViewPropTypes.style</code>               | 图标样式                                              |
| message   | <code>string</code>                            | 图标正下方的主要文案，必填                            |
| desc      | <code>string</code>                            | `message`下方的描述解释文案，选填                     |
| extraInfo | <code>string</code>                            | 底部按钮上方的描述解释文案，选填，`TYPE.BUTTON`时有效 |
