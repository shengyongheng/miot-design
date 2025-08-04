---
title: ListItemWithSwitch
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
import ListItemWithSwitch from 'miot/ui/ListItem/ListItemWithSwitch';
import React from 'react';

const Index = () => {
  return (
    <ListItemWithSwitch
      title="标题测试标题测试标题测试标题测试标题测试标题测试"
      valueText="测试测试测试测试测试测试测试测试测试测试测试"
      subtitle="副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试"
      onPress={(_) => console.log('do what u want to do')}
      onValueChange={(value: boolean) => console.log(value)}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      subtitleStyle={{ fontSize: 10, color: 'green' }}
      valueTextStyle={{ fontSize: 10, color: 'yellow' }}
      separator={<>/</>}
    />
  );
};

export default Index;
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
