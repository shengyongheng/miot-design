## Select选择器

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   |选择器。                            |
| 描述      |   弹出一个下拉菜单给用户选择操作，          |
| 位置      | `mhui-rn/dist/components/Select`                      |
| SDK_Level | `SDK_10056`                                |
| 注意事项  | \                                           |

### 使用方法

```jsx
import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import BarStatisticsCardWithToggle from 'mhui-rn/dist/modules/statistics/StatisticsPageWithDoubleChart'
import Select from 'mhui-rn/dist/components/select/Select';
import Option from 'mhui-rn/dist/components/select/Option';

export default function SelectDemo() {
  return (
    <Select
        width={94}
        height={30}
        titleFontSize={13}
        onChangeIdx={(idx) => {
          console.log('idx: ', idx);
        }}>
        <Option title="按周显示" optionWidth={200}/>
        <Option title="按日显示" />
        <Option title="按月显示" />
      </Select>
  )
}
      
```

### 参数

#### SelectPropsType
| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| initialOptionValue         | <code>string</code>                | 初始的选择框文本内容。 | ''  |
| initialOptionIndex         | <code>number</code>                | 初始的选项索引。 | -1  |
| selectedColor         | <code>string</code>                | 选中的option项字体颜色。 | ''  |
| selectedIcon         | <code>ImageSourcePropType</code>                | 选中的option项图标。 |  |
| optionWidth         | <code>number</code>                | option 项的宽度。 | 163  |
| optionHeight         | <code>number</code>                | option 项的高度。 | 50  |
| options         | <code>`Array<BaseOptionPropsType>`</code>                | 数据化配置选项内容。 | 163 |
| onSelectChange         | <code>`(optionIndex: number, optionValue: string \| number) => void`</code>                | 选中项改变发生的回调。 |   |
| children     | <code>` Array<React.ReactElement<OptionPropsType>>`</code>    | JSX 定义的 option项| |


#### BaseOptionPropsType
| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| disabled         | <code>boolean</code>                | 是否禁用点击。 | false |
| title         | <code>`React.ReactText`</code>                | 选项的标题内容 | '' |
| value         | <code>`string \| number`</code>                | 选项的标题颜色。 | '#000000'  |
| color         | <code>`Array<BaseOptionPropsType>`</code>                | 数据化配置选项内容。 |  |
| icon         | <code>ImageSourcePropType</code>                | 选项图标 |   |
| underlayColor     | <code>string</code>    | 点击时显示的底部颜色 | 米家点击态蒙层颜色 |

