---
title: GearCard 滑动档位卡片
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# GearCard 滑动档位卡片

## 简介

| 基本信息  |                                                               |
| --------- | ------------------------------------------------------------- |
| 中文名称  | 滑动档位卡片                                                  |
| 描述      | 基于卡片容器开发的滑动档位卡片。 有 tab，dot 和 gear 三种样式 |
| 位置      | `miot/ui/Card/GearCard`                                       |
| SDK_Level | `SDK_10048`                                                   |
| 注意事项  | \                                                             |

## 用法

```tsx
import { GearCard } from 'miot-design';
import React, { useState } from 'react';

const Index = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <GearCard
        title="最简单最弹窗asd"
        subtitle="as输输入输输入dqwe"
        cardType={GearCard.CARD_TYPE.SLIDER}
        onSliderValueChange={(value) => console.log(value)}
        showSwitch={true}
        sliderProps={{ value: 10, showDots: 0.25 }}
        sliderStyle={{ minimumTrackTintColor: 'red', thumbTintColor: 'white' }}
        options={Array.from({ length: 40 }, (_, i) => i * 5)}
      />
      <GearCard
        title="最简单最弹窗asd"
        subtitle="as输输入输输入dqwe"
        showSwitch={true}
        currentIndex={0}
        unlimitedHeightEnable
        switchValue={!disabled}
        disabledGear={disabled}
        onSwitchValueChange={(value) => {
          setDisabled(!value);
        }}
        cardType={GearCard.CARD_TYPE.TAB}
        titleNumberOfLines={2}
        allowFontScaling={false}
        options={Array.from({ length: 5 }, (_, i) => i + 1 + '挡')}
        subtitleStyle={{}}
        titleStyle={{}}
        gearTextStyle={{}}
        cardStyle={{ marginBottom: 10 }}
      />
      <GearCard
        title="最简单简单输入弹窗"
        subtitle="as输输输入输输dqwe"
        showSwitch={true}
        allowFontScaling={false}
        currentIndex={2}
        cardType={GearCard.CARD_TYPE.DOT}
        titleNumberOfLines={2}
        subtitleNumberOfLines={2}
        options={Array.from({ length: 9 }, (_, i) => i + 1)}
        onPress={(index) => {
          console.log('点击', index);
        }}
      />
    </>
  );
};

export default Index;
```

## API

### CARD_TYPE(卡片类型)

| Name   | Type                | Value                             | Description                      |
| ------ | ------------------- | --------------------------------- | -------------------------------- |
| TAB    | <code>string</code> | <code>&quot; tab&quot; </code>    | tab 选择档位 最小 2 挡 最多 5 挡 |
| SLIDER | <code>string</code> | <code>&quot; slider&quot; </code> | 滑条                             |
| DOT    | <code>string</code> | <code>&quot; dot&quot; </code>    | 点按 最小 3 挡 最多 9 挡         |

### 属性

| Name                  | Type                         | Description                                                          | Value                                                                                                                                                                                           |
| --------------------- | ---------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cardType              | <code>CARD_TYPE</code>       | 卡片类型                                                             | tab                                                                                                                                                                                             |
| title                 | <code>string</code>          | 标题                                                                 |
| subtitle              | <code>string</code>          | 副标题                                                               |
| titleStyle            | <code>style</code>           | 标题的自定义样式                                                     |
| subtitleStyle         | <code>style</code>           | 副标题的自定义样式                                                   |
| gearTextStyle         | <code>style</code>           | 档位文案的自定义样式                                                 |
| showSwitch            | <code>bool</code>            | 是否显示开关                                                         | false                                                                                                                                                                                           |
| disabledSwitch        | <code>bool</code>            | 禁止点击开关                                                         |
| disabledGear          | <code>bool</code>            | 禁止点击滑条/tab                                                     |
| cardStyle             | <code>style</code>           | 卡片样式                                                             |
| titleNumberOfLines    | <code>number</code>          | 设置 title 显示的最大行数                                            | 1                                                                                                                                                                                               |
| options               | <code>array<string>          | array<number></code> - 档位可选项，以字符串数组表示，必填            |
| onPress               | <code>function(index)</code> | 点击档位事件                                                         |
| currentIndex          | <code>number</code>          | 当前档位数组下标 [0, options.length-1]                               |
| duration              | <code>number</code>          | 滑块滑动动画时长                                                     |
| switchValue           | <code>bool</code>            | 开关的状态，默认是 `false`                                           |
| onTintColor           | <code>string</code>          | 开关打开时的背景颜色，                                               |
| tintColor             | <code>string</code>          | 开关关闭时的背景颜色，                                               |
| onSwitchValueChange   | <code>function</code>        | 点击卡片开关的回调函数，                                             |
| subtitleNumberOfLines | <code>number</code>          | 设置 subtitle 显示的最大行数                                         | 1                                                                                                                                                                                               |
| unlimitedHeightEnable | <code>bool</code>            | 设置控件高度是否自适应。 默认为 false，即默认高度, 需使用 scrollView |
| allowFontScaling      | <code>bool</code>            | 设置卡片字体是否随系统设置的字体大小的设置改变而改变                 | true                                                                                                                                                                                            |
| sliderProps           | <code>object</code>          | slider 的属性值                                                      | <code> value:50 // 被选择档位的数组下标, <br/> showEndText:true // 是否显示两端的文字，即 `options` 的第一个和最后一个，默认 `true` </code>                                                     |
| sliderStyle           | <code>object</code>          | slider 的自定义样式                                                  | <code> minimumTrackTintColor: "#32BAC0", // slider 左侧已填充颜色, <br/> maximumTrackTintColor: "#EDEEEF", // slider 右侧未填充颜色, thumbTintColor: "#FFFFFF", // 可移动圆圈的填充颜色 </code> |
| onSliderValueChange   | <code>function</code>        | 滑动回调函数，返回实时的 options 下标                                |
| onSlidingComplete     | <code>function</code>        | 滑动结束回调函数                                                     |
