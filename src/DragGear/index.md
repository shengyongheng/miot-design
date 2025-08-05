---
title: DragGear
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

```js
import { DragGear } from 'mhui-rn-fixed';
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

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
