## 列表卡片 - ListCard

### 预览

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称    | 列表卡片                                                   |
| 描述       | 将ListItem嵌入到card中的卡片           |
| 位置       | `miot/ui/Card/ListCard` |
| SDK_Level | `SDK_10047` |
| 注意事项   | （注意与ListItem区分）|  

### 使用方法

``` jsx

<ListCard
  title='开关控制卡片状态'
  subtitle='as输输入输输入输输dqwe'
  type={ListCard.TYPE.ARROW}
  showSwitch={true}
  radiusType={ListCard.CARD_RADIUS_TYPE.NONE}
  showSeparator
  switchValue={!this.state.disable}
  titleNumberOfLines={2}
  subtitleNumberOfLines={2}
  onPress={() => { console.log('点击') }}
/>

//大字体
<ListCard
  title='列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…'
  subtitle='列表主文案超出，文案最多支持两行，超出用…列表主文案超出，文案最多支持两行，超出用…'
  subtitleNumberOfLines={2}
  titleNumberOfLines={2}
  type={ListCard.TYPE.SWITCH}
  showSeparator
  radiusType={ListCard.CARD_RADIUS_TYPE.TOP}
  allowFontScaling={false}
  onSwitchValueChange={() => {console.log('123')}}
  subtitleStyle={{ lineHeight: 18 }}
  titleStyle={{ lineHeight: 22 }}
  unlimitedHeightEnable
  cardStyle={{marginHorizontal:20, width:width-60}}
/>

```

### 参数

#### TYPE(卡片类型)

| Name   | Type                | Value                             | Description      |
| ------ | ------------------- | ----------------------------------| ---------------- |
| SWITCH | <code>string</code> | <code>&quot;switch&quot; </code> | 开关     |
| CHOICE | <code>string</code> | <code>&quot;choice&quot; </code> | 单选     |
| BUTTON | <code>string</code> | <code>&quot;button&quot; </code> | 按钮     |
| ARROW  | <code>string</code> | <code>&quot;arrow&quot; </code>  | 箭头     |
| NONE   | <code>string</code> | <code>&quot;none&quot; </code>   | 无     |

#### CARD_RADIUS_TYPE(卡片圆角类型)

| Name   | Type                | Value                             | Description      |
| ------ | ------------------- | ----------------------------------| ---------------- |
| ALL | <code>string</code> | <code>&quot;all&quot; </code> | 四角都是圆角     |
| NONE | <code>string</code> | <code>&quot;none&quot; </code> | 四角都是直角     |
| TOP | <code>string</code> | <code>&quot;top&quot; </code> | 上方圆角下方直角     |
| BUTTOM  | <code>string</code> | <code>&quot;buttom&quot; </code>  | 上方直角下方圆角     |

#### 属性

| Name    | Type                | Description                     | Value      |
| ------- | ------------------- | ------------------------------- | ---------- | 
| type    | <code>TYPE</code> | ListCard右侧图标的类型, 默认无 | none |
| radiusType | <code>CARD_RADIUS_TYPE</code> | 卡片圆角类型 | all |
| title | <code>string</code> | 标题 |
| subtitle | <code>string</code> | 副标题 |
| value | <code>string</code> | 右侧文案(仅能与右侧箭头同时存在) |
| titleStyle | <code>style</code> | 标题的自定义样式 |
| subtitleStyle | <code>style</code> | 副标题的自定义样式 |
| valueStyle | <code>style</code> | 右侧文案的自定义样式 |
| titleNumberOfLines | <code>number</code>  | 设置title显示的最大行数 | 1 |
| subtitleNumberOfLines | <code>number</code>  | 设置subtitle显示的最大行数 | 2 |
| valueNumberOfLines | <code>number</code>  | 设置value显示的最大行数 | 1 |
| cardStyle | <code>style</code>  | 卡片样式 |
| icon | <code>ImageSourcePropType</code>  | 左侧自定义图标 |
| themeColor | <code>string</code> | card图标背景主题颜色 | 米家绿 |
| onPress | <code>function</code> | 点击事件 |
| disabled | <code>bool</code>  | 禁止点击 | false |
| showSeparator | <code>bool</code> | 是否显示分割线，默认值 `true` |
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |
| unlimitedHeightEnable | <code>bool</code>  | 设置控件高度是否自适应。 默认为false，即默认高度, 需使用scrollView |
| allowFontScaling | <code>bool</code>  | 设置卡片字体是否随系统设置的字体大小的设置改变而改变 | true |
| switchStyle | <code>style</code> |  开关样式 |
| switchValue    | <code>bool</code>  | 开关的状态，默认是 `false` |
| onTintColor    | <code>string</code> | 开关打开时的背景颜色，     |
| tintColor      | <code>string</code> | 开关关闭时的背景颜色，    |
| onSwitchValueChange  | <code>function</code>  | 点击卡片开关的回调函数，  |
| buttonOption | <code>object</code>  | 按钮属性 | <code>title - 按钮文字<br/> backgroundColor -  控制按钮背景颜色{ bgColorNormal: string; bgColorPressed: string };详情请参阅组件PopButton <br/> titleStyle -  按钮标题样式,设置字体大小无效 <br/> onPress - 按钮方法 </code> |
| choiceOption | <code>object</code>  | 单选属性 | <code> checkedColor - 背景颜色 <br/> onValueChange - 切换事件<br/> checked - 是否勾选</code> |