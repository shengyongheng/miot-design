---
title: Radio
group:
  title: Radio
nav:
  title: '组件'
  path: /components
---

# Button 按钮

## 简介

Button 组件是一个基础的交互元素，用于触发操作。

## 用法

```jsx
// @ts-ignore
import Radio from 'miot/ui/Radio';
import React, { useState } from 'react';

const App = () => {
  const [disabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Radio
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
      />
    </>
  );
};

export default App;
```

## API

| 属性  | 类型    | 默认值    | 说明                                           |
| ----- | ------- | --------- | ---------------------------------------------- |
| type  | string  | 'default' | 按钮类型，可选值为 'primary', 'dashed', 'link' |
| size  | string  | 'middle'  | 按钮尺寸，可选值为 'large', 'middle', 'small'  |
| shape | string  | 'default' | 按钮形状，可选值为 'circle', 'round'           |
| value | boolean | false     | 指定当前是否选中                               |
| ...   | ...     | ...       | ...                                            |
