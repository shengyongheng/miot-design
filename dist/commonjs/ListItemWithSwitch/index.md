---
title: ListItemWithSwitch 带开关的列表项
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# ListItemWithSwitch 带开关的列表项

## 简介

| 基本信息  |                                                            |
| --------- | ---------------------------------------------------------- |
| 中文名称  | 带开关的列表项                                             |
| 描述      | 常用的列表项，右侧带有开关，可设置标题/标题右侧文字/副标题 |
| 位置      | `miot/ui/ListItem/ListItemWithSwitch`                      |
| SDK_Level | `SDK_10004`                                                |
| 注意事项  | \                                                          |

## 用法

```tsx
// @ts-ignore
import { ListItemWithSwitch } from 'miot-design';
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

### TYPE(弹窗的类型)

| Name   | Type                | Description |
| ------ | ------------------- | ----------- |
| SWITCH | <code>string</code> | 开关        |
| BUTTON | <code>string</code> | 按钮        |
| CHOICE | <code>string</code> | 单选        |
| SORT   | <code>string</code> | 排序        |

### buttonOption(按钮选项)

| Name    | Type                  | Description |
| ------- | --------------------- | ----------- |
| title   | <code>string</code>   | 按钮标题    |
| onPress | <code>function</code> | 点按事件    |

### choiceOption(单选选项)

| Name          | Type                  | Description            |
| ------------- | --------------------- | ---------------------- |
| checkedColor  | <code>string</code>   | 按钮打开时的背景颜色   |
| onValueChange | <code>function</code> | 切换事件               |
| checked       | <code>bool</code>     | 是否勾选，默认 `false` |

### sortOption(排序选项)

| Name        | Type                  | Description |
| ----------- | --------------------- | ----------- |
| onPress     | <code>function</code> | 点按事件    |
| onLongPress | <code>function</code> | 长按事件    |

| Name           | Type                             | Description                                    |
| -------------- | -------------------------------- | ---------------------------------------------- |
| type           | <code>TYPE</code>                | 10045 新增 右侧的图标类型，默认为开关          |
| title          | <code>string</code>              | 左侧主标题                                     |
| subtitle       | <code>string</code>              | 左侧副标题，主标题下方                         |
| valueText      | <code>string</code>              | 主标题右侧文案                                 |
| value          | <code>bool</code>                | 开关状态，默认值 `false`                       |
| disabled       | <code>bool</code>                | 是否禁用开关，默认值 `false`                   |
| onPress        | <code>function</code>            | 列表项点击事件，不传则不具有点击态（disabled） |
| onValueChange  | <code>function</code>            | 开关切换事件                                   |
| showSeparator  | <code>bool</code>                | 是否显示分割线，默认值 `true`                  |
| separator      | <code>component</code>           | 自定义分割线，不传将显示默认样式的分割线       |
| containerStyle | <code>style</code>               | 列表项的自定义样式                             |
| titleStyle     | <code>style</code>               | 主标题的自定义样式                             |
| subtitleStyle  | <code>style</code>               | 副标题的自定义样式                             |
| valueTextStyle | <code>style</code>               | 主标题右侧文案的自定义样式                     |
| switchStyle    | <code>style</code>               | 开关样式，仅支持宽高                           |
| onTintColor    | <code>string</code>              | 开关按钮打开时的背景颜色                       |
| tintColor      | <code>string</code>              | 开关按钮关闭时的背景颜色                       |
| leftIcon       | <code>ImageSourcePropType</code> | 10045 新增 左侧自定义图标                      |
| buttonOption   | <code>object</code>              | 10045 新增 按钮选项                            |
| choiceOption   | <code>object</code>              | 10045 新增 单选选项                            |
| sortOption     | <code>object</code>              | 10045 新增 排序选项                            |
