## 步骤条-Steps

### 基本信息

| 基本信息   |                                           |
| --------- | ----------------------------------------- |
| 中文名称   | 步骤条控件            |
| 描述      |   引导用户按照流程完成任务的导航条。                          |
| 位置      | `miot/ui/Steps`                      |
| SDK_Level | `SDK_10053`                                |
| 注意事项  | \                                           |

### 使用方法

```jsx
import React from 'react';
import { View, Button } from 'react-native'
import { Step, Steps } from 'mhui-rn/dist/components/steps'

export default class StatisticsCardTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }
  }


  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
        <View style={{ height: 200 }}>
          <Steps current={this.state.current}
            // disabled
            onChangeCurrent={(idx) => {
              console.log('ccc', idx);
            }}>
            <Step
              title="主洗"
            />
            <Step
              status='process'
              title="漂洗"
            />
            <Step
              title="脱水"
            />
            <Step
              title="烘干"
            />
          </Steps>
        </View>
        <Button title='点我' onPress={() => {
          this.setState({
            current: (this.state.current + 1) % 4
          })
        }} />

      </View>
    )
  }
}
```

### 参数

#### Steps ----- 整体步骤条。
| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| current         | <code>number</code>                | 指定当前步骤，从 0 开始记数。 | 0   |
| status         | <code>`'wait' \| 'finish' \| 'process'`</code>                | 指定当前步骤的状态 | 'process'   |
| disabled         | <code>boolean</code>                | 是否禁用点击。 | false  |
| separatorBackgroundColor         | <code>string</code>                |分割线的背景颜色。 | '#696969'   |
| onChangeCurrent         | <code>` (newCurrent: number) => void`</code>                |current变化时的回调。 |    |


#### Step ----- 步骤条内的每一个步骤。
| 属性               | 类型                               | 说明                              | 默认值       |
| ----------------- | ---------------------------------  | -------------------------------- | ----------- |
| status         | <code>`'wait' \| 'finish' \| 'process'`</code>                | 指定当前步骤的状态。 | 'wait'  |
| disabled         | <code>boolean</code>                | 是否禁用点击。 | false  |
| title         | <code>string</code>                |标题 | ''   |
| iconBackgroundColor         | <code>string</code>                |自定义图标背景颜色。 |    |
|titleColor| <code>string</code> | 自定义标题颜色。 | |
