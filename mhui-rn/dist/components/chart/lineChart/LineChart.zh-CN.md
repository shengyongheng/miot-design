## 米家弹窗-摆角范围调节器-CircularSlider

### 背景
### 预览


### 基本信息

| 基本信息  |                                  |
| --------- | -------------------------------- |
| 中文名称  | 米家插件折线统计图——纯视图部分               |
| 描述      | 符合米家插件设计规范的柱形统计图 |
| 位置      | `mhui-rn/dist/components/chart`      |
| SDK_Level | `10049`                          |
| 注意事项  | \                                |
| 存在问题  |        |

### 使用方法
```jsx

      <LineChart
        initialSelectedIndex={0}
        dataset={}
        onChangeIndex={(index) => console.log(index)}
        xAxisMaxSplitNumber={5}
        dotSelectedRadius={6}
        dotRawPassable={false}
        dotRawRadius={0}
        showTooltip
        showDot
      />

```
### 参数
| Param      | Type                                    | Description                                                                                                   |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| curveLinePoints   | <code>Array<Array<number>></code> | 折线图点坐标数值。如`[[0,1],[20,2]]`  |
| width | <code>number</code>             |  折线图宽度 |
| height | <code>number</code>                 | 折线图高度 |
| lineStrokeWidth   | <code>number</code>            | 折线或曲线的线宽。默认为2                       |
| padding    | <code>number</code>                   | 折线图距离边界的填充。   |
| xAxisDataStyle | <code>LabelStyle</code> | x轴标签样式     |
| xAxisLineStyle | <code>LineStyle</code> | x轴线样式     |
| xAxisMaxSplitNumber | <code>number</code> | x轴最多显示的标签。默认7     |
| xAxisData | <code>`Array<string | number>`</code> |  x轴标签 |
| xAxisDataOffset | <code>number</code> | x轴数据距离x轴的偏移。默认30。     |
| yAxisDataStyle | <code>LabelStyle</code> | x轴标签样式     |
| yAxisLabels | <code>` Array<{ label: string | number; value: number }>`</code> | x轴最多显示的标签。默认7     |
| yAxisDataOffset | <code>number</code> | y轴数据距离y轴的偏移。默认0  |
| showSplitLine | <code>boolean</code> |是否显示分割线。默认显示     |
| splitLineStyle | <code>LineStyle</code> | 分割线样式  |
| showSplitLine | <code>boolean</code> |是否显示分割线。默认显示     |
| curveLineColor | <code>`Array<{ offset: number; color: string;}> | string;`</code> | 折线颜色。默认为 'red'  |
| curveLineWidth | <code>number</code> | 折线宽度。 |
| smoothing | <code>boolean</code> | 是否开启平滑。默认开启，且平滑率为0.2   |


