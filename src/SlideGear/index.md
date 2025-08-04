---
title: SlideGear
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
import SlideGear from 'miot/ui/Gear/SlideGear';
import React, { useState } from 'react';
import { Text } from 'react-native';

const App = () => {
  const [selectIndex, setSelectIndex] = useState(2);
  const [options] = useState(['1', '2', '3']);
  return (
    <>
      <Text style={{}}>{`滑动选择档位(圆形滑块)`}</Text>
      <SlideGear
        options={options}
        value={selectIndex}
        containerStyle={{ width: '100%' }}
        onValueChange={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
      />
      {/* @ts-ignore */}
      <Text style={{}}>{`滑动选择档位(方形滑块)`}</Text>
      <SlideGear
        type={SlideGear.TYPE.RECTANGLE}
        options={options}
        showEndText={false}
        containerStyle={{ width: '100%', height: 66 }}
        blockStyle={{ width: 30, backgroundColor: 'red' }}
        minimumTrackTintColor="lightpink"
        maximumTrackTintColor="skyblue"
        value={selectIndex}
        onValueChange={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
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
