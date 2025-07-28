## 米家直接坐标系-RectCoordinateSystem

### 背景
### 预览


### 基本信息

| 基本信息  |                                    |
| --------- | ---------------------------------- |
| 中文名称  | 米家直接坐标系                     |
| 描述      | 柱形统计图和直线统计图依赖的坐标系 |
| 位置      | `mhui-rn/dist/components/chart`    |
| SDK_Level | `10051`                            |
| 注意事项  | \                                  |
| 存在问题  |                                    |

### 使用方法
```jsx
   <RectCoordinateSystem
        xAxisData={[1,2,3,4,5]}
        yAxisLabels={[{ label: 1, value: 85}, { label: 2, value: 0}]}
        width={200}
        height={200}
        showXAxisLabels
        showYAxisLabels
        padding={30}
        gestureEnable={false}
        onPress={() => console.log('press')}
      >
      </RectCoordinateSystem>

```
### 参数
| Param               | Type                                  | Description                                                                                                                           |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| width               | <code>number</code>                   | 图表宽度                                                                                                                              |
| height              | <code>number</code>                   | 图表高度                                                                                                                              |
| viewBox             | <code>string</code>                   | viewBox属性允许指定一个给定的一组图形伸展以适应特定的容器元素。参考https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox |
| gestureEnable       | <code>boolean</code>                  | 是否开启手势。默认为true                                                                                                              |
| padding             | <code>number</code>                   | 折线图距离左右和下边界（不包括上边界）的填充。默认30                                                                                                          |
| showXAxisLabels     | <code>boolean</code>                  | 是否显示x轴标签。默认显示                                                                                                             |
| xAxisDataStyle      | <code>LabelStyle</code>               | x轴标签样式.默认 {  fill: '#B2B2B2', strokeWidth: '0.5', fontSize: '10', fontFamily: 'MILanPro--GB1-4', textAnchor: 'middle', }       |
| xAxisLineStyle      | <code>LineStyle</code>                | x轴线样式                                                                                                                             |
| xAxisMaxSplitNumber | <code>number</code>                   | x轴最多显示的标签。默认7                                                                                                              |
| xAxisData           | <code>Array<string \| number></code> | x轴标签     |
| xAxisDataOffset     | <code>number</code>                   | x轴数据距离x轴的偏移。默认30。       |
| showYAxisLabels    | <code>boolean</code>   | 是否显示y轴标签。默认显示   |
| yAxisDataStyle    | <code>LabelStyle</code>         | x轴标签样式.默认 {  fill: '#B2B2B2', strokeWidth: '0.5', fontSize: '10', fontFamily: 'MILanPro--GB1-4', textAnchor: 'middle', }   |
| yAxisLabels    | <code>Array<{ label: string \| number; value: number }></code>     | y轴标签。其中,value属性为在y轴方向上相对父节点的偏移量   |
| yAxisDataOffset    | <code>number</code>                   | y轴数据距离y轴的偏移。默认0。   |
| showHorizontalSplitLine    | <code>boolean</code>                   | 是否显示水平分割线。默认显示   |
| showVerticalSplitLine    | <code>boolean</code>                   | 是否显示垂直分割线。默认不显示   |
|splitLineStyle|<code>LineStyle</code>| 分割线样式 |
|itemAlign| <code>'start' \| 'middle'</code>  |点和x轴标签的对齐方式。start:图表项（或柱形条或折线点）位于分割线上；middle：图表项位于相邻分割线中间 |
|linearGradientConfig| <code>Array<{ stopColor?: Array<StopColorType> \| string;  id: string; }></code> | 渐变色配置 |
| onPress    | <code> (e: GestureResponderEvent) => void </code>    | 点击区域的回调函数   |
|onResponderMove|<code>(event: GestureResponderEvent, gestureState: PanResponderGestureState) => void</code>|手势移动时的回调。需要开启gestureEnable|
|onResponderRelease|<code>(event: GestureResponderEvent, gestureState: PanResponderGestureState) => void</code>|手势释放时的回调。需要开启gestureEnable|
| children| <code>React.ReactElement \| Array<React.ReactElement \| null> \| null</code>| 孩子节点。可以应用linearGradientConfig生成的Defs |
