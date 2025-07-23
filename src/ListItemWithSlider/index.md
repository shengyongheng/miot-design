---
title: ListItemWithSlider
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
---

# ListItem 普通列表项

## 简介

常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字

## 用法

```tsx
import React from 'react';
import { Text } from 'react-native';
import ListItemWithSlider from 'miot/ui/ListItem/ListItemWithSlider';

export default () => (
  <>
    <ListItemWithSlider
      title="自定义样式的滑动条列表项自定义样式的滑动条列表项"
      sliderProps={{ minimumValue: 25, maximumValue: 75, value: 60 }}
      sliderStyle={{
        minimumTrackTintColor: 'red',
        maximumTrackTintColor: '#fff',
        style: { width: '100%', alignSelf: 'center' },
        trackStyle: { height: 4, borderRadius: 2 },
        thumbStyle: { width: 30, height: 30, borderRadius: 15 },
      }}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      valueStyle={{ fontSize: 10, color: 'yellow' }}
      showWithPercent={false}
      unit={'cal'}
      onValueChange={(value: any) => console.log(value)}
      onSlidingComplete={(value: any) => console.log(value)}
      separator={<>/</>}
    />
  </>
);
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
