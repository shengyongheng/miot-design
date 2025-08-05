---
title: GearCard
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
import { GearCard } from 'mhui-rn-fixed';
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

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
