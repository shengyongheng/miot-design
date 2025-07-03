## 数据统计界面HOC-StatisticsPageWrapper

### 预览


### 基本信息

| 基本信息  |                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  | 数据统计界面。                                                                                                                         |
| 描述      | 数据统计界面。 |
| 位置      | `mhui-rn/dist/modules/statistics`                                                                                                                |
| SDK_Level | `SDK_10042`                                                                                                                    |
| 注意事项  | \                                                                                                                              |

### 使用方法

```jsx
   const dataSource = [
  [
    [
      { value: 68, formatTime: 'a', timestamp: 1546387200000 },
      { value: 120, formatTime: 'b', timestamp: 1569974400000 },
      { value: 0, formatTime: 'v', timestamp: 1580774400000 },
      { value: 30, formatTime: 'b', timestamp: 1608031168136 }
    ],
    [
      { value: 30, formatTime: 'b', timestamp: 1608031168136 },
      { value: 55, formatTime: 'v', timestamp: 1556755200000 },
      { value: 65, formatTime: 'c', timestamp: 1580860800000 },
      { value: 85, formatTime: 'd', timestamp: 1608031168136 }
    ]
  ],
  [
    [
      { value: 20, formatTime: 'b', timestamp: 1546387200000, },
      { value: 55, formatTime: 'v', timestamp: 1556755200000 },
      { value: 65, formatTime: 'c', timestamp: 1580860800000 },
      { value: 85, formatTime: 'd', timestamp: 1608031168136 }
    ],
    [
      { value: 38, formatTime: 'a', timestamp: 1546387200000 },
      { value: 120, formatTime: 'b', timestamp: 1569974400000 },
      { value: 0, formatTime: 'v', timestamp: 1580774400000 },
      { value: 30, formatTime: 'b', timestamp: 1608031168136 }
    ]
  ]
]

class DialogTest3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statisticsValues: [],
      statisticsData: [],
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      const dataset = dataSource.map((tabsData) => {
        const newTabsData = tabsData.map((cData) => {
          return cData.map(({ timestamp, value }) => [2, value]);
        })
        return newTabsData;
      });

      this.setState({
        statisticsData: dataset
      })
    }, 200)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { statisticsValues=[] } = this.state;
    return (<StatisticsPage
       titleConfig={
        {
          statistics: [{ name: '总用电量(°)', value: statisticsValues[0] || 0 },
          { name: '总用水量(m³)', value: statisticsValues[1] || 0 },
          { name: '洗涤次数(次)', value: statisticsValues[2] || 0 }]
        }
      }
      chartConfig={{
        showHorizontalSplitLine: false,
        showYAxisLabels: false,
        barRawFill: ['rgba(36,161,255, 0.4)', 'rgba(0,228,176, 0.4)'],
        barSelectedFill: ['#24A1FF', '#00E4B0']
      }}
      radioGroupConfig={
        {
          radioOptions: [
            {
              id: 0,
              value: '日',
            },
            {
              id: 1,
              value: '周',
            },
            {
              id: 2,
              value: '月',
            },
          ]
        }
      }
      chartType={'BarChart'}
      isLoading={false}
      showTabs={false}
      multiTabs={false}
      onChangeActiveTabKey={(activeKey) => {
        console.log('activeKey', activeKey);
      }}
      onChangeCheckedRadioId={(checkedId) => {
        console.log('checkedId', checkedId);
      }}
      onChangeSelectedIndex={(selectedIndex) => {
         this.setState({
          statisticsValues: [selectedIndex, selectedIndex, selectedIndex]
        })
        console.log('selectedIndex', selectedIndex);
      }}
      statisticsData={this.state.statisticsData}
    />);
  }
}
```

### 参数
| 属性                  | 类型                                | 说明                                                                                                                          | 默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| isLoading    | <code>boolean</code> | 是否处于加载状态。默认为true  |
| statisticsData    | <code>`Array<DatasetMultiGroupItemsType | DatasetGroupItemsType> \| Array<Array<DatasetMultiGroupItemsType | DatasetGroupItemsType>>`</code> | 保存的统计数据。DatasetMultiGroupItemsType 和 DatasetGroupItemsType 详情参见组件库中chart |
| titleConfig    | <code>`TitleConfigType \| Array<TitleConfigType>`</code> | 统计界面title配置。可为一组或多组配置，在tab切换时切换。 |
| radioGroupConfig    | <code>` RadioGroupConfigType \| Array<RadioGroupConfigType>`</code> | radioGroups配置。可为一组或多组配置，在tab切换时切换。 |
| tabsConfig    | <code>`TabsConfigType \| Array<TabsConfigType>`</code> | tabs配置。可为一组或多组配置，在tab切换时切换。 |
|chartConfig| <code>`ChartConfigType \| Array<ChartConfigType>`</code>| 统计界面图表配置。可为一组或多组配置，在tab切换时切换。注意，这里的ChartConfigType包含： 'xAxisDataFormatter', 'barRawFill', 'barSelectedFill', 'barUnderlayColor', 'showHorizontalSplitLine', 'showYAxisLabels', 'overflow' 和 'xAxisMaxSplitNumber'属性。详情参见组件库中chart/BarChart |
|chartType | <code>`'BarChart' \| 'LineChart'`</code>| 图表类型。|
|showTabs | <code>boolean</code>| 是否显示tabs。默认不显示|
|multiTabs | <code>boolean</code>| 是否是多组tab。注意，如果数据源中仅包含一组tab数据，但是是用数组包裹的，请设置multiTabs为true。|
|multiTabs | <code>boolean</code>| 是否是多组tab。注意，如果数据源中仅包含一组tab数据，但是是用数组包裹的，请设置multiTabs为true。|
|onChangeActiveTabKey| <code>`(activeKey: number) => void`</code>| 切换tab时的回调函数 |
|onChangeCheckedRadioId| <code>`(checkedId: number) => void`</code>|切换radio时的回调函数 |
|onChangeSelectedIndex|<code>`(selectedIndex: number) => void`</code>|选中项改变时发生的回调|

#### RadioGroupConfigType
| 属性                  | 类型                                | 说明                                                                                                                          |默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |--|
| separatorLineColor    | <code> `string`</code> | 分割线颜色| '#E5E5E5' |
| radioRawTextColor    | <code> `string`</code> | 日周月按钮未选中时的文本颜色| '#666666' |
| radioCheckedTextColor    | <code> `string`</code> | 日周月按钮选中时的文本颜色|  'rgba(255,255,255,0.90)' |
| radioRawBackgroundColor    | <code> `string`</code> | 按钮未选中时背景颜色| '#F7F7F7'|
| radioCheckedBackgroundColor    | <code> `string`</code> | 按钮被选中时背景颜色| 'FFA626'|
|checkedId| <code>number</code> | 默认的checkedId | 0 |
|radioOptions| <code>`Array<{id: number;value: string \| number;type: 'week' \| 'month' \| 'day';}>`</code> | 选项配置。 必选项。 ||
 
 #### TitleConfigType
| 属性                  | 类型                                | 说明                                                                                                                          |默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |--|
| valueColor    | <code>`string`</code> | 统计数值的颜色|  |
| nameColor    | <code>`string`</code> | 统计名称（即统计的是什么）的颜色| |
| emptyValue    | <code> string</code> | statistics字段为空时，填充的统计数值| '--' |
| emptyName    | <code> string </code> | statistics字段为空时，填充的统计名称 | 'no data' |
| statistics | <code>`Array<{ name: string \| number; value: string \| number }>`</code> | 统计值。name：统计的是什么，value：统计的结果是多少。 必选项。    | |

 #### TabsConfigType
| 属性                  | 类型                                | 说明                                                                                                                          |默认值|
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |--|
| tabItems    | <code> `Array<{  key: number; value: number \| string; }>`</code> | tabs item 文本 | 必选项 |
| activeKey    | <code> `number`</code> | 初始的激活 tab 面板的 key| 0 |
| inactiveTabsColor    | <code> `string`</code> | 处于不活动状态的tabs文字颜色| '#000000' |
| activeTabColor    | <code> `string`</code> | 处于活动状态的tab文字颜色| '#999999' |
