---
title: Provider 全局化配置
group:
  path: '/global-config'
  title: 全局化配置
  order: 999
nav:
  title: '组件'
  path: /components
---

## 简介

为组件提供统一的全局化配置。

### 何时使用

- 想修改默认主题色时

## 主题配置

```js
<Provider
  theme={{
    brand_primary: palette[5], // 品牌基础色 #108ee9
    fill_base: palette[0], // 组件默认背景色 #ffffff
    primary_button_fill: palette[5], // 按钮背景颜色 <Button type="primary">
    primary_button_fill_tap: palette[3], // 按钮下压时背景颜色
    color_icon_base: palette[4], // 许多小图标的背景颜色
  }}
>
  ...
</Provider>
```

## 样式覆盖

样式覆盖包含默认主题样式、全局应用级主题样式和组件级样式，且优先级：组件级样式 > 全局应用级主题样式 > 默认主题样式。向组件中传递 `styles` 可以实现组件级样式的覆盖。

## 用法

```jsx
import React from 'react';
import { CommonCard, Provider } from 'miot-design';

const App = (props) => {
  return (
    <Provider
      theme={{
        _color: 'red',
        background_color: 'silver',
      }}
    >
      <CommonCard
        title="标题"
        count={100}
        isActive2={true}
        styles={{
          container: {
            backgroundColor: '#e26f08',
          },
          title: {
            color: 'green',
          },
        }}
      />
    </Provider>
  );
};

export default App;
```

## API

| 属性  | 类型                                         | 默认值 | 说明         |
| ----- | -------------------------------------------- | ------ | ------------ |
| theme | typeof defaultTheme & { [key: string]: any } | {}     | 全局主题配置 |
