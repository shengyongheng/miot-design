---
title: DragGear 拖拽选档
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# DragGear 拖拽选档

## 简介

| 基本信息  |                                                                                              |
| --------- | -------------------------------------------------------------------------------------------- |
| 中文名称  | 拖拽选档                                                                                     |
| 描述      | 使用拖拽手势或者直接点击从不同选项中选择一项，有动效。<br />适用于电暖器、净化器的档位切换。 |
| 位置      | `miot/ui/Gear/DragGear`                                                                      |
| SDK_Level | `SDK_10011`                                                                                  |
| 注意事项  | \                                                                                            |

## 用法

```jsx
import { DragGear } from 'miot-design';
import React, { useState } from 'react';
import { Text } from 'react-native';

const App = () => {
  const [selectIndex, setSelectIndex] = useState(1);

  return (
    <>
      <Text>// 参数和 NormalGear 一致</Text>
      <DragGear
        options={['off', '1', '2', '3', '4', '5']}
        normalStyle={{ width: 60 }}
        margin={20}
        selectColor={'green'}
        textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
        maxWidth={300}
        selectIndex={selectIndex}
        onSelect={(index) => {
          setSelectIndex(index);
          console.log(`select${index}`);
        }}
        containerStyle={{ backgroundColor: '#fff' }}
      />
    </>
  );
};

export default App;
```

## API

| Name           | Type                             | Description                                                                                                                                                        |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options        | <code>array&lt;string&gt;</code> | 档位可选项，以字符串数组表示，必填。<br />❗️ 每项文字尽量精简                                                                                                     |
| margin         | <code>number</code>              | 档位选项之间的间距，默认 `12`, 示意图 \|12⭕️12⭕️12\|                                                                                                             |
| maxWidth       | <code>number</code>              | 容器宽度最大值，不传则默认屏幕宽度。 如果所有档位的宽度 + 间距占据的宽度 <= `maxWidth`，则取实际宽度； 否则容器宽度取 `maxWidth`，各个档位的宽度和间距自适应减小。 |
| containerStyle | <code>style</code>               | 容器样式，设置宽高无效                                                                                                                                             |
| normalStyle    | <code>style</code>               | 普通档位样式，如果没有设置宽高，则默认宽高为 `50`                                                                                                                  |
| textStyle      | <code>style</code>               | 档位文字的样式                                                                                                                                                     |
| selectColor    | <code>string</code>              | 被选择档位的背景色                                                                                                                                                 |
| selectIndex    | <code>number</code>              | 被选择档位的数组下标                                                                                                                                               |
| onSelect       | <code>function</code>            | 选择某档位后的回调函数                                                                                                                                             |
