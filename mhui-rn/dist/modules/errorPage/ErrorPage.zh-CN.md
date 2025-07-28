## 故障（或错误）页面-----ErrorPage

### 预览
![](/docImages/errorPage(1).jpeg)
![](/docImages/errorPage(2).jpeg)
### 基本信息

| 基本信息  |                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  |  故障（或错误）页面                                                                                                                         |
| 描述      |  故障（或错误）页面 |
| 位置      | `mhui-rn/dist/modules/errorPage`                                                                                                                |
| SDK_Level | `SDK_10053`                                                                                                                    |
| 注意事项  | \                                                                                                                              |

### 使用方法



```jsx

import React from 'react';
import { View } from 'react-native'
import { ErrorPage, ErrorPageSection, ErrorPageHeader, ErrorPageMain, ErrorPageFooterButton, ErrorPageFooter } from 'mhui-rn/dist/modules/errorPage'


export default class ErrorPageTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }
  }


  render() {
    return (
     <ErrorPage>
       <ErrorPage>
          <ErrorPageHeader icon='' title='各种异常报错文案' subtitle="故障代码:_F" />
          <ErrorPageMain>
            <ErrorPageSection content={[
              '检查4支滤芯是否安装到位,滤芯是否过期,如果过期需更换滤芯',
              '按说明书拆掉触控龙头打开自来水水阀，检查水流是否比较小',
              '将与水龙头连接的转接头拆掉，看是否有杂质堵塞转接头滤网，将滤网冲洗干净',
              '请检查您家的水压是否过低，楼顶二次供水、用水高峰期水压也会太低，可以请物业调高水压',
              '水压低水流就低造成报故障，按以上步骤分别排查后，重新开机制纯水尝试故障是否排除',
              '如按照以上步骤排查后故障未消除，请拨打小米客服热线400-100-5678，请专业人员为您排查解决',
            ]} />
          </ErrorPageMain>
          <ErrorPageFooter>
            <ErrorPageFooterButton
              // themeColor=""
              title="400-100-9527"
              onPress={() => console.log('2')} />
          </ErrorPageFooter>
        </ErrorPage>
    )
  }
}
    
```

```jsx
import React from 'react';
import { View } from 'react-native'
import { ErrorPage, ErrorPageSection, ErrorPageHeader, ErrorPageMain, ErrorPageFooterButton, ErrorPageFooter } from 'mhui-rn/dist/modules/errorPage'


export default class ErrorPageTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    }
  }

  render() {
    return (
     <ErrorPage>
        <ErrorPageHeader
            // icon=''
            title='各种异常报错文案' subtitle="故障代码:_F" />
          <ErrorPageMain>
            <ErrorPageSection title="可能原因：" content={['排水管被异物堵塞', '排水阀被衣物碎屑堵塞', '排水管口位置过高']}>
            </ErrorPageSection>
            <ErrorPageSection title="解决方法：" content={['排水管被异物堵塞', '排水阀被衣物碎屑堵塞', '排水管口位置过高']}>
            </ErrorPageSection>
            <ErrorPageSection title="重置方法：" content={`解决故障后，请在洗衣机面板，按“启动/暂停”继续使用，如不能自行排除故障，请关闭水源及电源，并联系售后服务。`}>
            </ErrorPageSection>
          </ErrorPageMain>
          <ErrorPageFooter>
            <ErrorPageFooterButton
              title="联系售后"
              themeColor="#F5F5F5"
              titleColor='#4C4C4C'
              width={147} onPress={() => console.log('1')} />
            <ErrorPageFooterButton
              themeColor="#0091FF"
              title="我知道了"
              width={147} onPress={() => console.log('2')} />
          </ErrorPageFooter>
        </ErrorPage>
    )
  }
}
```

### 参数

#### ErrorPageHeader
| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| icon    | <code>ImageSourcePropType</code> | 故障信息的图标。如果未定义，则该头部图标会被隐藏。  |
| title    | <code>string</code> | 故障标题。如果为定义，则不显示。 |
| subtitle    | <code>string</code> | 副标题。如果为定义，则不显示。 |

#### ErrorPageMain: ErrorPageSection容器
#### ErrorPageSection
| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
|title | <code>string</code>| 分组标题。如果未定义，则分组标题会被隐藏。|
| content    | <code>`string \| Array<string>`</code> | 内容。由一个字符串或多个内容项组成。必选项。 |
|contentItemDelimiter | <code>string</code>| 内容分割符。只有在内容为数组类型时，才会生效。默认'\n'|
| contentItemFormatter    | <code>` (item: string, idx: number, content: Array<string> \| string) => string`</code> | 每一条帮助信息的格式化函数。其中，item： 一条内容项，idx: 该条内容项的索引；content: 完整内容 |

#### ErrorPageFooter: ErrorPageFooterButton容器
#### ErrorPageFooterButton
| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
|title | <code>string</code>| 底部按钮标题。如果未定义，则底部按钮会被隐藏。|
|titleColor | <code>string</code>| 底部按钮标题颜色。默认#FFFFFF |
|themeColor | <code>string</code>| 底部按钮背景颜色。默认#0091FF |
|underlayColor | <code>string</code>| 底部按钮点击时显示的底层颜色。默认rgba(0,0,0,0.25) |
|width | <code>`string \| number`</code>| 按钮宽度。默认为'100%' |
|height | <code>`string \| number` </code>| 按钮高度。默认为46 |
|borderRadius | <code>number</code>| 按钮圆角半径。默认为23 |
|onPress| <code>`() => void`</code>| 底部按钮被点击时的回调。 |
