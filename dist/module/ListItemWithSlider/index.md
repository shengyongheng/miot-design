---
title: ListItemWithSlider 带滑动条的列表项
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# ListItemWithSlider 带滑动条的列表项

## 简介

| 基本信息  |                                                       |
| --------- | ----------------------------------------------------- |
| 中文名称  | 带滑动条的列表项                                      |
| 描述      | 常用的列表项，标题下方有滑动条，可设置标题/滑动条样式 |
| 位置      | `miot/ui/ListItem/ListItemWithSlider`                 |
| SDK_Level | `SDK_10004`                                           |
| 注意事项  | \                                                     |

## 用法

```tsx
// @ts-ignore
import { ListItemWithSlider } from 'miot-design';
import React from 'react';

const App = () => {
  return (
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
      onValueChange={(value) => console.log(value)}
      onSlidingComplete={(value) => console.log(value)}
      separator={<>/</>}
    />
  );
};

export default App;
```

## API

| Name              | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | <code>string</code>    | 标题                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| sliderProps       | <code>object</code>    | `slider` 的属性值<br />默认值<br />{<br /> minimumValue:0,<br /> maximumValue:100,<br /> step:1,<br /> value:50<br />}<br />`minimumValue`: 最小值<br />`maximumValue`: 最大值<br />`step`: 步长<br />`value`: 当前值                                                                                                                                                                                                                                                                                                                                                                                                            |
| showWithPercent   | <code>bool</code>      | 是否以百分比显示当前值，默认值 `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| unit              | `string`               | 当前值的单位。`showWithPercent = true` 将不显示单位<br />(`❗️SDK_10020`新增)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| sliderStyle       | <code>object</code>    | `slider` 的自定义样式<br />默认值<br />{<br />minimumTrackTintColor: "#32BAC0",<br />maximumTrackTintColor: "rgba(0,0,0,0.15)",<br />thumbTintColor: "#32BAC0",<br />style: {},<br />trackStyle: { height: 2, borderRadius: 1 },<br />thumbStyle: { width: 24, height: 24, borderRadius: 12 }<br />}<br />`minimumTrackTintColor`: slider 左侧已填充颜色<br />`maximumTrackTintColor`: slider 右侧未填充颜色<br />`thumbTintColor`: 可移动圆圈的填充颜色<br />`style`: slider 容器的自定义样式--10045 新版不可用<br />`trackStyle`: 轨的自定义样式--10045 新版不可用<br />`thumbStyle`: 可移动圆圈的自定义样式--10045 新版不可用 |
| onValueChange     | `function`             | 滑动回调函数，返回实时的滑动值(`❗️SDK_10020`新增)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| onSlidingComplete | <code>function</code>  | 滑动结束回调函数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| disabled          | <code>bool</code>      | 是否禁用滑动，默认值 `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| containerStyle    | <code>style</code>     | 列表项的自定义样式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| titleStyle        | <code>style</code>     | 标题的自定义样式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| valueStyle        | <code>style</code>     | `value`的自定义样式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| showSeparator     | <code>bool</code>      | 是否显示分割线，默认值 `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| separator         | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| useNewType        | <code>bool</code>      | 10045 新增 是否使用新版滑条, 默认 false, 10045 后 _ 必须 _ 使用新版滑条 老版滑条将被废弃                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
