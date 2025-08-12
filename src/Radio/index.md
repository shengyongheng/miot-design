---
title: Radio 单选框

order: 1
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
  order: 0
---

# Radio 单选框

## 简介

| 基本信息  |                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  | 单选框                                                                                                                         |
| 描述      | 就像网页上的单选按钮一样，点击某一项就能把它选中，有动画效果。<br />如果按钮为 `disabled` 状态，则显示半透明效果并且不可点击。 |
| 位置      | `miot/ui/Radio`                                                                                                                |
| SDK_Level | `SDK_10020`                                                                                                                    |
| 注意事项  | \                                                                                                                              |

## 用法

```jsx
// import { Radio } from 'miot-design';
import { Radio } from 'miot-design';
import React, { useState } from 'react';

const App = () => {
  const [disabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Radio
        isChecked={isChecked}
        changeCheck={changeCheck}
        id={1}
        bigCircleStyle={{
          borderWidth: 4,
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
        checkedBigCircleStyle={{
          borderColorChecked: '#00C',
          backgroundColorChecked: '#33F',
          borderColor: '#666',
          backgroundColor: '#999',
        }}
        disabled={disabled}
      />
    </>
  );
};

export default App;
```

## API

| Name                  | Type                  | Description                                                                                                                          |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| isChecked             | <code>bool</code>     | 按钮的选中状态，默认值 `false`                                                                                                       |
| bigCircleStyle        | <code>object</code>   | 大圆的尺寸、圆角半径、边宽，默认值 `{}`                                                                                              |
| checkedBigCircleStyle | <code>object</code>   | 大圆在选中和非选中状态下的边框颜色、背景色。<br />默认值<br />非选中状态：`边框#666，背景#999`。<br />选中状态：`边框#060，背景#090` |
| smallCircleBg         | <code>string</code>   | 小圆的背景色，默认值 `white`                                                                                                         |
| changeCheck           | <code>function</code> | 改变选中状态的函数，参数为单选按钮的 `id`                                                                                            |
| id                    | <code>number</code>   | 单选按钮的 id，用来区分不同的按钮，实现单选功能，默认值 `-1`                                                                         |
| disabled              | `bool`                | 单选按钮的可选状态，默认值 `false`                                                                                                   |
