## 日期选择器-YMDDatePicker

### 属性

| Name                    | Default               | Type                                        | Value                                                                                  |
| ----------------------- | --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| date                    | []                    | (string Date number) (string Date number)[] | 默认选择日期，可传 Date 对象、能够转化为日期的字符串、时间戳，多选则为以这些构成的数组 |
| onSelected              |                       | Function                                    | 选择函数，参数为选择的单个日期或选择的日期数组                                         |
| multiple                | false                 | boolean                                     | 是否支持多选                                                                           |
| range                   | false                 | boolean                                     | 是否支持范围选择，忽略 multiple                                                        |
| readonly                | false                 | boolean                                     | 日期是否只读                                                                           |
| showWeek                | false                 | boolean                                     | 是否在左侧展示周数                                                                     |
| panel                   | 'date'                | 'date' 'month'                              | 选择日期或者月份                                                                       |
| max                     |                       | date                                        | 最大可选日期                                                                           |
| min                     |                       | date                                        | 最小可选日期                                                                           |
| allowDates              | () => true            | (string) => boolean                         | 传入 yyyy-mm-dd，返回布尔值决定当前日期是否可选                                        |
| event                   | []                    | (string {color: string, date: string})[]    | 日期字符串数组或颜色、日期字符串构成的对象数组                                         |
| firstDayOfWeek          | 0                     | number string                               | 每周第一天星期数                                                                       |
| showAdjacentMonths      | false                 | boolean                                     | 是否展示前后月的日期                                                                   |
| onChangePanelBefore     |                       | Function                                    | 点击左右箭头                                                                           |
| onChangePanelAfter      |                       | Function                                    | 点击左右箭头                                                                           |
| onChangePanelTypeBefore |                       | Function                                    | 点击箭头中间文字                                                                       |
| onChangePanelTypeAfter  |                       | Function                                    | 点击箭头中间文字                                                                       |
| localeFirstDayOfYear    | 4                     | string number                               | 决定一年中第一周的日期，从 0 开始，星期日。对于 ISO 8601，应该是 4                     |
| backgroundColor         | #FFFFFF               | string                                      | 背景色                                                                                 |
| button                  | false                 | string boolean                              | 底部按钮是否显示，若传字符串则同时配置按钮文字                                         |
| buttonColor             | 'rgba(0, 0, 0, 0.06)' | string                                      | 按钮颜色                                                                               |
| fullscreen              | false                 | boolean                                     | 是否占满全屏                                                                           |
| theme                   | #32BAC0               | string                                      | 主题色                                                                                 |
| closeImmediately        | false                 | boolean                                     | 是否在选择后立即关闭弹窗                                                               |
| visible                 | false                 | boolean                                     | 显示弹窗                                                                               |
| title                   | true                  | boolean string                              | 是否展示顶部标题，若传字符串则同时配置标题文字                                         |
