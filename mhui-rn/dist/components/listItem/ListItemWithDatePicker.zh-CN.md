## 带时间选择器的输入列表-ListItemWithDatePicker

### 预览


### 基本信息

| 基本信息  |                                                                                   |
| --------- | --------------------------------------------------------------------------------- |
| 中文名称  | 带时间选择器的输入列表项                                                                            |
| 描述      | 带时间选择器的输入列表 |
| 位置      | `miot/ui/ListItem/ListItemWithDatePicker`                                                  |
| SDK_Level | `SDK_10048`                                                                       |
| 注意事项  | \                                                                                 |

### 使用方法

```jsx
  <InputListItem 
    title='date类型' 
    type='date' 
    dateType={MHDatePicker.TYPE.SINGLE} 
    dialogTitle='啊啊' 
    onPress={() => console.log('date类型')} 
  />
   <InputListItem 
    title='date类型' 
    type='date' 
    dateType={MHDatePicker.TYPE.TIME12} 
    dialogTitle='啊啊' 
    onPress={() => console.log('date类型')} 
  />

```
### 参数

| 属性           | 类型                         | 描述                                     | 默认值  |
| -------------- | ---------------------------- | ---------------------------------------- | ------- |
| value          | <code>`string|undefined`</code>          | 时间选择器中选好的时间字符串 | `''`    |
| onChange          | <code>`(...args: any[]) => void`</code>          | 列表值发生改变时的回调。统一的回调。                    | `undefined`    |
| dateType          | <code>`'single' | 'time24' | 'time12' | 'date'`</code>          | 时间选择器类型        | `time12`    |
| dialogTitle          | <code>`string`</code>          | 对话框标题。      | ``    |
| title          | <code>string</code>          | 左侧主标题                               | 无      |
| subtitle       | <code>string</code>          | 右侧副标题                               | `''`    |
| onPress        | <code>function</code>        | 点击事件                                 | 无      |
| disabled       | <code>boolean</code>         | 是否禁用点击                             | `false` |
| showSeparator  | <code>boolean</code>         | 是否显示分割线                           | `true`  |
| hideArrow      | <code>boolean</code>         | 是否隐藏右侧箭头图片，(`❗️SDK_10020`新增) | `false` |
| showDot        | <code>boolean</code>         | 是否显示小红点 (`❗️SDK_10021`新增)        | `false` |
| separator      | <code>React.ReactNode</code> | 自定义分割线，不传将显示默认样式的分割线 | 无      |
| containerStyle | <code>ViewStyle</code>       | 列表项的自定义样式                       | `{}`    |
| titleStyle     | <code>TextStyle</code>       | 标题的自定义样式                         | `{}`    |
| subtitleStyle  | <code>TextStyle</code>       | 副标题的自定义样式                       | `{}`    |
| valueStyle     | <code>TextStyle</code>       | 右侧文案的自定义样式                     | `{}`    |
| dotStyle     | <code>ViewStyle</code>       | 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真    | `{}`    |
| allowFontScaling     | <code>boolean</code>       | 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变   | `true`    |
| unlimitedHeightEnable     | <code>boolean</code>       | 10040新增 设置控件高度是否自适应。 默认为false，即默认高度   | `false`    |
| titleNumberOfLines     | <code>number</code>       | 10040新增 设置title字体显示的最大行数    | `1`    |
| subtitleNumberOfLines     | <code>number</code>       | 10040新增 设置subtitle字体显示的最大行数    | `2`    |
| valueNumberOfLines     | <code>number</code>       | 10040新增 设置value字体显示的最大行数    | `1`    |
| accessible     | <code>boolean</code>       | 无障碍    | `1`    |
| accessibilityLabel     | <code>`number|string`</code>       | 无障碍    | `1`    |
| accessibilityHint     | <code>`number|string`</code>       | 无障碍    | `1`    |
