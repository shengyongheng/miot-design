---
title: Radio
group:
  path: '/basic'
  title: 基础组件
  order: 1
nav:
  title: '组件'
  path: /components
---

# Radio 单选框

## 简介

Radio 组件是一个基础的交互元素，用于触发操作。

## 用法

```jsx
// @ts-ignore
import Radio from 'miot/ui/Radio';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

const App = () => {
  const [disabled] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      {/* <Radio
        isChecked={isChecked}
        changeCheck={changeCheck}
        id={1}
        bigCircleStyle={{
          borderWidth: 4,
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
        checkedBigCircleStyle={{
          borderColorChecked: '#00C',
          backgroundColorChecked: '#33F',
          borderColor: '#666',
          backgroundColor: '#999',
        }}
        disabled={disabled}
      /> */}
      <WebView
        source={{
          uri: 'https://www.juejin.cn',
        }}
        style={{
          flex: 1,
        }}
      />
      <iframe
        loading="lazy"
        src="https://snack.expo.dev/embedded/@hengshengyong/button?preview=true&platform=ios"
        height="100%"
        width="100%"
        frameborder="0"
        data-snack-iframe="true"
        style="display: block"
      ></iframe>
    </>
  );
};

export default App;
```

## 预览

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <body>
      <div
        class="snack-player"
        data-snack-name="Button Example"
        data-snack-description="Example usage"
        data-snack-files="%7B%22App.tsx%22%3A%7B%22type%22%3A%22CODE%22%2C%22contents%22%3A%22import%20React%20from%20'react'%3B%5Cnimport%20%7BStyleSheet%2C%20Button%2C%20View%2C%20Text%2C%20Alert%7D%20from%20'react-native'%3B%5Cnimport%20%7BSafeAreaView%2C%20SafeAreaProvider%7D%20from%20'react-native-safe-area-context'%3B%5Cn%5Cnconst%20Separator%20%3D%20()%20%3D%3E%20%3CView%20style%3D%7Bstyles.separator%7D%20%2F%3E%3B%5Cn%5Cnconst%20App%20%3D%20()%20%3D%3E%20(%5Cn%20%20%3CSafeAreaProvider%3E%5Cn%20%20%20%20%3CSafeAreaView%20style%3D%7Bstyles.container%7D%3E%5Cn%20%20%20%20%20%20%3CView%3E%5Cn%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.title%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20The%20title%20and%20onPress%20handler%20are%20required.%20It%20is%20recommended%20to%20set%5Cn%20%20%20%20%20%20%20%20%20%20accessibilityLabel%20to%20help%20make%20your%20app%20usable%20by%20everyone.%5Cn%20%20%20%20%20%20%20%20%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%3CButton%5Cn%20%20%20%20%20%20%20%20%20%20title%3D%5C%22Press%20me%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20Alert.alert('Simple%20Button%20pressed')%7D%5Cn%20%20%20%20%20%20%20%20%2F%3E%5Cn%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%3CSeparator%20%2F%3E%5Cn%20%20%20%20%20%20%3CView%3E%5Cn%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.title%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20Adjust%20the%20color%20in%20a%20way%20that%20looks%20standard%20on%20each%20platform.%20On%5Cn%20%20%20%20%20%20%20%20%20%20iOS%2C%20the%20color%20prop%20controls%20the%20color%20of%20the%20text.%20On%20Android%2C%20the%5Cn%20%20%20%20%20%20%20%20%20%20color%20adjusts%20the%20background%20color%20of%20the%20button.%5Cn%20%20%20%20%20%20%20%20%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%3CButton%5Cn%20%20%20%20%20%20%20%20%20%20title%3D%5C%22Press%20me%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20color%3D%5C%22%23f194ff%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20Alert.alert('Button%20with%20adjusted%20color%20pressed')%7D%5Cn%20%20%20%20%20%20%20%20%2F%3E%5Cn%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%3CSeparator%20%2F%3E%5Cn%20%20%20%20%20%20%3CView%3E%5Cn%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.title%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20All%20interaction%20for%20the%20component%20are%20disabled.%5Cn%20%20%20%20%20%20%20%20%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%3CButton%5Cn%20%20%20%20%20%20%20%20%20%20title%3D%5C%22Press%20me%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20disabled%5Cn%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20Alert.alert('Cannot%20press%20this%20one')%7D%5Cn%20%20%20%20%20%20%20%20%2F%3E%5Cn%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%3CSeparator%20%2F%3E%5Cn%20%20%20%20%20%20%3CView%3E%5Cn%20%20%20%20%20%20%20%20%3CText%20style%3D%7Bstyles.title%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20This%20layout%20strategy%20lets%20the%20title%20define%20the%20width%20of%20the%20button.%5Cn%20%20%20%20%20%20%20%20%3C%2FText%3E%5Cn%20%20%20%20%20%20%20%20%3CView%20style%3D%7Bstyles.fixToText%7D%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3CButton%5Cn%20%20%20%20%20%20%20%20%20%20%20%20title%3D%5C%22Left%20button%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20Alert.alert('Left%20button%20pressed')%7D%5Cn%20%20%20%20%20%20%20%20%20%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3CButton%5Cn%20%20%20%20%20%20%20%20%20%20%20%20title%3D%5C%22Right%20button%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20onPress%3D%7B()%20%3D%3E%20Alert.alert('Right%20button%20pressed')%7D%5Cn%20%20%20%20%20%20%20%20%20%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%20%20%3C%2FView%3E%5Cn%20%20%20%20%3C%2FSafeAreaView%3E%5Cn%20%20%3C%2FSafeAreaProvider%3E%5Cn)%3B%5Cn%5Cnconst%20styles%20%3D%20StyleSheet.create(%7B%5Cn%20%20container%3A%20%7B%5Cn%20%20%20%20flex%3A%201%2C%5Cn%20%20%20%20justifyContent%3A%20'center'%2C%5Cn%20%20%20%20marginHorizontal%3A%2016%2C%5Cn%20%20%7D%2C%5Cn%20%20title%3A%20%7B%5Cn%20%20%20%20textAlign%3A%20'center'%2C%5Cn%20%20%20%20marginVertical%3A%208%2C%5Cn%20%20%7D%2C%5Cn%20%20fixToText%3A%20%7B%5Cn%20%20%20%20flexDirection%3A%20'row'%2C%5Cn%20%20%20%20justifyContent%3A%20'space-between'%2C%5Cn%20%20%7D%2C%5Cn%20%20separator%3A%20%7B%5Cn%20%20%20%20marginVertical%3A%208%2C%5Cn%20%20%20%20borderBottomColor%3A%20'%23737373'%2C%5Cn%20%20%20%20borderBottomWidth%3A%20StyleSheet.hairlineWidth%2C%5Cn%20%20%7D%2C%5Cn%7D)%3B%5Cn%5Cnexport%20default%20App%3B%22%7D%7D"
        data-snack-dependencies="react-native-safe-area-context"
        data-snack-platform="web"
        data-snack-supported-platforms="ios,android,web"
        data-snack-theme="dark"
        data-snack-preview="true"
        data-snack-loading="lazy"
        data-snack-device-frame="false"
      >
        <iframe
          loading="lazy"
          src="https://snack.expo.dev/@hengshengyong/button?preview=true&platform=ios"
          height="100%"
          width="100%"
          frameborder="0"
          data-snack-iframe="true"
          style="display: block"
        ></iframe>
      </div>
      <!-- <iframe
        loading="lazy"
        src="https://snack.expo.dev/@hengshengyong/button"
        height="100%"
        width="100%"
        frameborder="0"
        data-snack-iframe="true"
        style="display: block"
      ></iframe> -->
    </body>
  </body>
</html>
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
