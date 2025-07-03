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
<RectCoordinateSystem
      width={200}
      height={200}
      showXAxisLabels={false}
      showYAxisLabels={false}
      padding={20}
      gestureEnable={false}
      linearGradientConfig={linearGradientConfig}
      onPress={handlePress}
    >
      {children}
    </RectCoordinateSystem>

```
### 参数
| Param      | Type                                    | Description                                                                                                   |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| initialSelectedIndex   | <code>number</code> | 初始化的选中项的索引，默认为0  |
| width | <code>number</code>             |  图表宽度 |
| height | <code>number</code>                 | 图表高度 |
| showTooltip   | <code>boolean</code>            | 是否显示提示框。默认显示。    |
| showDot    | <code>boolean</code>                   | 是否显示点。默认显示。   |
| chartDots    | <code>`Array<number[]>`</code>                   | 一组点坐标。   |
| dotFill    | <code>string</code>                   | 点的填充颜色   |
| dotStroke    | <code>string</code>                   | 点的填充颜色   |
| dotStrokeWidth    | <code>string</code>                   | 点的线宽   |
| dotRawRadius    | <code>number</code>                   | 点的半径。默认为5   |
| dotSelectedRadius    | <code>number</code>                   | 点被选中时的半径。默认为8   |
| onChange    | <code>`(idx: number) => void`</code>                   | 选中项改变的回调。   |
| toolTipWidth    | <code>number</code>                   | 提示框宽度   |
| toolTipHeight    | <code>number</code>                   | 提示框高度   |
| toolTipFill    | <code>string</code>                   | 提示框填充颜色   |
| tooltipFormatter    | <code>`(currentIndex: number) => string`</code>                   | 提示框文本内容格式化函数   |
|gestureEnable| <code>boolean</code>             |  是否使用手势。默认为true |

