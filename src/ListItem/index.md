---
title: ListItem
group:
  path: '/business'
  title: 业务组件
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

```jsx
import React from 'react';
import { Text } from 'react-native';
import ListItem from 'miot/ui/ListItem/ListItem';
import Separator from 'miot/ui/Separator';

export default () => (
  <>
    <ListItem
      title="自定义样式"
      subtitle="这是用来测试副标题的文案，尽量写长一点争取可以换行。"
      value="这是一段测试右侧文案"
      hideArrow={false}
      showDot={false}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      subtitleStyle={{ fontSize: 10, color: 'green' }}
      valueStyle={{ fontSize: 10, color: 'yellow' }}
      onPress={(_) => console.log(4)}
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
