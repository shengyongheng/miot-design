## 米家弹窗-摆角范围调节器-CircularSlider

### 背景
### 预览

![](/docImages/barchart_preview.jpeg)


### 基本信息

| 基本信息  |                                  |
| --------- | -------------------------------- |
| 中文名称  | 米家插件柱形统计图               |
| 描述      | 符合米家插件设计规范的柱形统计图 |
| 位置      | `miot/ui/barChart/BarChart`      |
| SDK_Level | `10042`                          |
| 注意事项  | \                                |
| 存在问题  | 接口不太清晰；暂时就这样         |

### 使用方法
```jsx
    // 单组数据源
   <BarChart
      initialSelectedIndex={0}
      dataset={[[1,20], [2,30], [3, 40], [4, 22]]}
      onChange={(index) => {
        console.log(index);
      }}
      xAxisMaxSplitNumber={5}
      itemAlign="middle"
      padding={27}
      barWidth={10}
      barSelectedFill="red"
      barRawFill={'gray'}
    />

    // 单组数据源且支持滚动
   <BarChart
      initialSelectedIndex={0}
      dataset={[[1,20], [2,30], [3, 40], [4, 22], [9, 33], [10,53]]}
      onChange={(index) => {
        console.log(index);
      }}
      xAxisMaxSplitNumber={5}
      itemAlign="middle"
      overflow="scroll"
      padding={27}
      barWidth={10}
      barSelectedFill="red"
      barRawFill={'gray'}
    />

    // 多组数据源
     <BarChart
        initialSelectedIndex={0}
        dataset={[
          [[1,20], [2,30], [3, 40], [4, 22]],
          [[1,45], [2,20], [3, 10], [4, 2]],
          [[1,40], [2,20], [3, 18], [4, 52]]
        ]}
        onChange={(index) => {
          console.log(index);
        }}
        xAxisMaxSplitNumber={5}
        itemAlign="middle"
        padding={27}
        barWidth={10}
        barSelectedFill="red"
        barRawFill={['gray', 'blue', 'yellow']}
      />

      // 多组数据源且支持滚动
     <BarChart
      initialSelectedIndex={0}
      dataset={[
        [[1,20], [2,30], [3, 40], [4, 22], [5, 20], [6,12]],
        [[1,45], [2,20], [3, 10], [4, 2], [5, 33], [6,23]],
        [[1,40], [2,20], [3, 18], [4, 52], [5,66], [6,44]]
      ]}
      onChange={(index) => {
        console.log(index);
      }}
      xAxisMaxSplitNumber={5}
      itemAlign="middle"
      overflow="scroll"
      padding={27}
      barWidth={10}
      barSelectedFill="red"
      barRawFill={['gray', 'blue', 'yellow']}
   />

```
### 参数
####  BarChart参数
| Param | Type                   | Description    |
| ----- | ---------------------- | -------------- |
| style | <code>ViewStyle</code> | 柱状图总体样式 |
