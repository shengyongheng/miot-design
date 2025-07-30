---
title: Card
order: 0
group:
  path: '/basic'
  title: 基础组件
  order: 2
nav:
  title: '组件'
  path: /components
  order: 0
---

# Card 卡片容器

## 简介

Card 组件是一个基础的交互元素，用于触发操作。

## 用法

<!-- <code src="./index.tsx"></code> -->

```tsx
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Card from 'miot/ui/Card/Card';

const Index = () => {
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);
  const [visible4, setVisible4] = useState(true);
  const ICON_SIZE = 16;
  // 插件开发者可以自定义内部视图
  const getInnerView = () => {
    return (
      <View style={styles.innerContainer}>
        <Image
          style={styles.innerIcon}
          source={require('./images/logo.jpg')}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.innerTitle} numberOfLines={1}>
            {'自定义innerView的标题'}
          </Text>
          <Text style={styles.innersubTitle} numberOfLines={1}>
            {'自定义innerView的副标题'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Text>自定义样式的卡片</Text>
      <Card
        icon={require('./images/logo.jpg')}
        text="自定义卡片"
        visible={visible3}
        dismiss={(_: any) => setVisible3(false)}
        showDismiss
        onPress={(_: any) => setVisible2(false)}
        cardStyle={{
          width: 350 / 2,
          height: 75,
          borderRadius: 12,
          backgroundColor: 'pink',
        }}
        iconStyle={{ width: ICON_SIZE, height: ICON_SIZE }}
        textStyle={{ fontSize: 10, color: 'red' }}
      />
      <Text>自定义内部视图的卡片</Text>
      <Card
        innerView={getInnerView()}
        visible={visible4}
        dismiss={(_: any) => setVisible4(false)}
        showShadow={false}
        showDismiss
        onPress={(_: any) => setVisible3(false)}
        cardStyle={{ width: 222, height: 80 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {},
  innerIcon: {
    height: 18,
    width: 18,
  },
  innerTitle: {},
  innersubTitle: {},
});

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
