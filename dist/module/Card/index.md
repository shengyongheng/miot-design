---
title: Card 卡片容器
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

| 基本信息  |                                                         |
| --------- | ------------------------------------------------------- |
| 中文名称  | 卡片容器                                                |
| 描述      | 卡片容器，有阴影，有弹出和收起动效。                    |
| 位置      | `miot/ui/Card/Card`                                     |
| SDK_Level | `SDK_10010`                                             |
| 说明      | 为了更好地扩展，开发者可以自定义卡片内部视图`innerView` |
| 注意事项  | \                                                       |

## 用法

<!-- <code src="./index.tsx"></code> -->

```jsx
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'miot-design';

const Index = () => {
  const [, setVisible2] = useState(true);
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
        dismiss={(_) => setVisible3(false)}
        showDismiss
        onPress={(_) => setVisible2(false)}
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
        dismiss={(_) => setVisible4(false)}
        showShadow={false}
        showDismiss
        onPress={(_) => setVisible3(false)}
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

| Name          | Type                   | Description                                                             |
| ------------- | ---------------------- | ----------------------------------------------------------------------- |
| innerView     | <code>component</code> | 卡片内部 View, 不传该参数将显示默认的左 `icon` + 右 `text`              |
| icon          | <code>int</code>       | 左侧图标的资源 id, 参照`Image`的`resource`属性, 不传将不显示图标        |
| text          | <code>string</code>    | 右侧文案                                                                |
| visible       | <code>bool</code>      | 是否显示卡片, 默认值 `true`                                             |
| showDismiss   | <code>bool</code>      | 是否显示右上角的关闭按钮, 默认值 `false`                                |
| disabled      | `bool`                 | 是否禁用卡片点击, 默认值 `false`<br />(`❗️SDK_10021`新增)              |
| dismiss       | <code>function</code>  | 点右上角关闭按钮的回调函数                                              |
| showShadow    | <code>bool</code>      | 是否显示卡片阴影, 默认值 `true`                                         |
| onPress       | <code>function</code>  | 点击事件, 不传该参数将显示禁用态                                        |
| cardStyle     | <code>style</code>     | 卡片容器的自定义样式, 默认样式 `{ width: screenWidth - 30, height:66 }` |
| iconStyle     | <code>style</code>     | 左侧图标的自定义样式                                                    |
| textStyle     | <code>style</code>     | 右侧文案的自定义样式                                                    |
| underlayColor | <code>string</code>    | 卡片点击态颜色，默认 `rgba(0,0,0,0.05)`                                 |
| shadowColor   | <code>string</code>    | 阴影颜色，默认 `'#000'`，❗️android 平台只支持 16 进制的 `shadowColor`  |
| shadowOpacity | <code>number</code>    | 阴影透明度，默认 `0.03`                                                 |
