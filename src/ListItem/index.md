---
title: ListItem 普通列表项

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

| 基本信息  |                                                                |
| --------- | -------------------------------------------------------------- |
| 中文名称  | 普通列表项                                                     |
| 描述      | 常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字 |
| 位置      | `miot/ui/ListItem/ListItem`                                    |
| SDK_Level | `SDK_10004`                                                    |
| 注意事项  | \                                                              |

## 用法

```jsx
// @ts-ignore
import { NavigationBar } from 'miot-design';
import React from 'react';

const Index = () => {
  return (
    <NavigationBar
      backgroundColor="black"
      type={NavigationBar.TYPE.DARK}
      left={[
        {
          key: NavigationBar.ICON.BACK,
          // onPress: (_) => this.props.navigation.goBack(),
        },
        {
          key: NavigationBar.ICON.CLOSE,
          onPress: (_) => console.log('onPress'),
        },
      ]}
      right={[
        {
          key: NavigationBar.ICON.COLLECT,
          disable: true,
          onPress: (_) => console.log('onPress'),
        },
        {
          key: NavigationBar.ICON.MORE,
          showDot: true,
          onPress: (_) => console.log('onPress'),
        },
      ]}
      title="标题"
      subtitle="副标题"
      onPressTitle={(_) => console.log('onPressTitle')}
    />
  );
};

export default Index;
```

## API

| Name           | Type                             | Description                                              |
| -------------- | -------------------------------- | -------------------------------------------------------- |
| title          | <code>string</code>              | 左侧主标题                                               |
| subtitle       | <code>string</code>              | 右侧副标题                                               |
| value          | <code>string</code>              | 右侧文案                                                 |
| onPress        | <code>function</code>            | 点击事件                                                 |
| disabled       | <code>bool</code>                | 是否禁用点击，默认值 `false`                             |
| showSeparator  | <code>bool</code>                | 是否显示分割线，默认值 `true`                            |
| hideArrow      | `bool`                           | 是否隐藏右侧箭头图片，默认值 `false`(`❗️SDK_10020`新增) |
| showDot        | `bool`                           | 是否显示小红点，默认值`false`(`❗️SDK_10021`新增)        |
| separator      | <code>component</code>           | 自定义分割线，不传将显示默认样式的分割线                 |
| containerStyle | <code>style</code>               | 列表项的自定义样式                                       |
| titleStyle     | <code>style</code>               | 标题的自定义样式                                         |
| subtitleStyle  | <code>style</code>               | 副标题的自定义样式                                       |
| valueStyle     | <code>style</code>               | 右侧文案的自定义样式                                     |
| leftIcon       | <code>ImageSourcePropType</code> | 10045 新增 左侧自定义图标                                |
